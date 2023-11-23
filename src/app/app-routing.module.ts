import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

const routes: Route[] = [
  {
    path: 'products',
    loadChildren: () => import('./products/feature/product-shell/product-shell.module').then(m => m.ProductShellModule),
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
