import { Observable } from 'rxjs';
import { Product } from '../models/product';

export abstract class ProductRepository {
  abstract getProducts(): Observable<Product[]>;
  abstract createProduct(product: Product): Observable<Product>;
  abstract updateProduct(product: Product): Observable<Product>;
  abstract deleteProduct(idProduct: Product): void;
}
