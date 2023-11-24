import { Observable } from 'rxjs';
import { Product } from '../models/product';

export interface ProductRepository {
    getProducts(): Observable<Product[]>;
    createProduct(product: Product): Observable<Product>;
    updateProduct(product: Product): Observable<Product>;
    deleteProduct(idProduct: string): Observable<any>;
    verifyProduct(idProduct: string): Observable<boolean>;
}
