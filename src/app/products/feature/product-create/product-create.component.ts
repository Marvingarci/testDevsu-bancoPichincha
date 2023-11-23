import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../data-access/services/product.service';
import { Product } from '../../data-access/models/product';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/data-access/toast.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit, OnDestroy{
  formProduct: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
    name: ['', Validators.required],
    description: ['', Validators.required],
    logo: ['', Validators.required],
    date_release: [new Date().toISOString().slice(0, 10), Validators.required],
    date_revision: [this.setAYearLater(new Date()), Validators.required],
  });

  productToEdit!: Product | null
  subs: Subscription[] = [] 
  title: string = 'Formulario de Registro'
  editMode: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.productToEdit = this.productService.productToEdit.value;
    if(this.productToEdit != null){
      this.editMode = true;
      this.title = 'Editar Registro'
      this.formProduct = this.fb.group({
        id: [this.productToEdit.id, [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
        name: [this.productToEdit.name, Validators.required],
        description: [this.productToEdit.description, Validators.required],
        logo: [this.productToEdit.logo, Validators.required],
        date_release: [this.productToEdit.date_release, Validators.required],
        date_revision: [this.productToEdit.date_revision, Validators.required],
      });
    }

    //when date_release changes, date_revision has to be a year later
    this.formProduct.get('date_release')?.valueChanges.subscribe(
      {
        next: (date_release) => {
          if(date_release){
            const date = new Date(date_release);
            this.formProduct.get('date_revision')?.setValue(this.setAYearLater(date));
          }
        }
      }
    )

  } 

  submit(reason: string) {
    if (this.formProduct.valid) {
      let observable = reason == 'edit' ? this.productService.updateProduct(this.formProduct.value as Product) 
      : this.productService.createProduct(this.formProduct.value as Product);
      this.subs.push(
        observable.subscribe(
          {
            next: (product: Product) =>{
              if(product.id)
              this.formProduct.reset();
              this.toastService.showSuccess('Producto '+(reason == 'edit' ? 'Editado': 'Creado')+' exitosamente');
              this.router.navigate(['/products']);
            },
            error: (error) =>  {
              console.log(error)
              if(error.error == "Can't create because product is duplicate"){
                this.toastService.showWarning('El producto ya existe');
                this.formProduct.get('id')?.setErrors({duplicate: true})
              }else if(error.error == "Not product found with that id"){
                this.toastService.showWarning('El producto con ese ID no existe');
                this.formProduct.get('id')?.setErrors({duplicate: true})
              }
            }
          }
        )
      )
    }else{
      this.markAllControlsAs(this.formProduct, true)
    }
  }


  markAllControlsAs(formGroup: FormGroup, condition: boolean) {
  Object.keys(formGroup.controls).forEach(controlName => {
    const control = formGroup.get(controlName);
    if (control) {
      condition ? control.markAsDirty(): control.markAsPristine();
    }
  });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  setAYearLater(date: Date) {
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().slice(0, 10)
  }

  resetForm():void{
    this.formProduct.setValue({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: new Date().toISOString().slice(0, 10),
      date_revision: this.setAYearLater(new Date()),
    })
    this.markAllControlsAs(this.formProduct, false)
  }
}
