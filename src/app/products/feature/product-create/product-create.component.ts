import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../data-access/services/product.service';
import { Product } from '../../data-access/models/product';
import { Subscription, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/data-access/toast.service';
import * as moment from 'moment';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit, OnDestroy{
  formProduct: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]],
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

  checkIfProductExists(): void{
    if(this.productToEdit != null){
      this.editMode = true;
      this.title = 'Editar Registro'
      this.formProduct = this.fb.group({
        id: [this.productToEdit.id, [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
        name: [this.productToEdit.name, Validators.required],
        description: [this.productToEdit.description, Validators.required],
        logo: [this.productToEdit.logo, Validators.required],
        date_release: [ moment(this.productToEdit.date_release, 'DD-MM-YYYY').format('YYYY-MM-DD'), Validators.required],
        date_revision: [moment(this.productToEdit.date_revision, 'DD-MM-YYYY').format('YYYY-MM-DD'), Validators.required],
      });
    }

  }

  ngOnInit(): void {
    this.productToEdit = this.productService.productToEdit.value;
    this.checkIfProductExists();
    
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
      this.subs.push(
        this.productService.verifyProduct(this.formProduct.get('id')?.value).pipe(
          switchMap((exists: boolean) => {
            if(exists && reason == 'edit'){
              return this.productService.updateProduct(this.formProduct.value as Product)
            }else if(!exists && reason == 'new'){
              return this.productService.createProduct(this.formProduct.value as Product)
            }else if(exists && reason == 'new'){
              return throwError({error: 'Can\'t create because product is duplicate'})
            }else if(!exists && reason == 'edit'){
              return throwError({error: 'Not product found with that id'})
            }else{
              return throwError({error: 'Error'})
            }
          })
        ).subscribe(
          {
            next: (product: Product) =>{
              if(product.id)
              this.formProduct.reset();
              this.toastService.showSuccess('Producto '+(reason == 'edit' ? 'Editado': 'Creado')+' exitosamente');
              this.router.navigate(['/products']);
            },
            error: (error) =>  {
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
