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
    logo: ['',],
    date_release: [new Date().toISOString().slice(0, 10), Validators.required],
    date_revision: [this.setAYearLater(new Date()), Validators.required],
  });

  // lastValueRelease:

  subs: Subscription[] = []  

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
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

  submit() {
    if (this.formProduct.valid) {
      this.subs.push(
        this.productService.createProduct(this.formProduct.value as Product).subscribe(
          {
            next: (product: Product) =>{
              if(product.id)
              this.formProduct.reset();
              this.toastService.showSuccess('Producto creado exitosamente');
              this.router.navigate(['/products']);
            },
            error: (error) =>  {
              console.log(error)
              if(error.error == "Can't create because product is duplicate")
                this.toastService.showWarning('El producto ya existe');
              
            }
          }
        )
      )
    }else{
      this.markAllControlsAsDirty(this.formProduct)
    }
  }

  markAllControlsAsDirty(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(controlName => {
    const control = formGroup.get(controlName);
    if (control) {
      control.markAsDirty();
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
}
