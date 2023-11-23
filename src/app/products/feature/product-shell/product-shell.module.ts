import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProductMainComponent } from '../product-main/product-main.component';
import { ProductTableComponent } from '../../ui/product-table/product-table.component';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { FilterTablePipe } from '../../utils/filter-table.pipe';
import { PaginationComponent } from 'src/app/shared/ui/pagination/pagination.component';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFormComponent } from 'src/app/shared/ui/input-form/input-form.component';
import { ConfirmationModalComponent } from 'src/app/shared/ui/confirmation-modal/confirmation-modal.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { SkeletonTableComponent } from 'src/app/shared/ui/skeleton-table/skeleton-table.component';

const routes: Route[] = [
  {
    path: '',
    component: ProductMainComponent,
  },
  {
    path: 'new',
    component: ProductCreateComponent
  },
  {
    path: 'edit/:id',
    component: ProductCreateComponent
  }
]

@NgModule({
  declarations: [
    ProductMainComponent,
    ProductTableComponent,
    ProductCreateComponent,
    FilterTablePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputComponent,
    PaginationComponent,
    ReactiveFormsModule,
    FormsModule,
    InputFormComponent,
    ConfirmationModalComponent,
    OverlayModule,
    SkeletonTableComponent
  ]
})
export class ProductShellModule { }
