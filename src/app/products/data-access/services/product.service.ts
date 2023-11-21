import { Injectable } from '@angular/core';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'env.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements ProductRepository {

  constructor(
    private http: HttpClient
  ) { }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.URI}/bp/products`, product); 
  }

  deleteProduct(idProduct: string): Observable<any> {
    return this.http.delete<any>(`${environment.URI}/bp/products?id=${idProduct}`); 
  }

  getProducts(): import("rxjs").Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.URI}/bp/products`); 
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.URI}/bp/products`, product); 
  }



}
