import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProductMainComponent } from '../product-main/product-main.component';

const routes: Route[] = [
  {
    path: '',
    component: ProductMainComponent,
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductShellModule { }
