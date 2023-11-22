import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProductMainComponent } from '../product-main/product-main.component';
import { NavbarComponent } from 'src/app/shared/ui/navbar/navbar.component';
import { ProductTableComponent } from '../../ui/product-table/product-table.component';

const routes: Route[] = [
  {
    path: '',
    component: ProductMainComponent,
  }
]

@NgModule({
  declarations: [
    ProductMainComponent,
    ProductTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavbarComponent
  ]
})
export class ProductShellModule { }
