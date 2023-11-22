import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorIdInterceptor } from './shared/utils/author-id.interceptor';
import { ProductTableComponent } from './products/ui/product-table/product-table.component';

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
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorIdInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
