import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { productMockInvalid, productMockValid } from '../../utils/mocks/products.mock';
import { environment } from 'env.development';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be create Product Service', () => {
    expect(service).toBeTruthy();
  });

  it('it should have an observable called productToEdit<Product> and other one productToDelete<Product>', () => {
    expect(service.productToDelete).toBeTruthy();
    expect(service.productToDelete instanceof BehaviorSubject).toBeTrue();
    expect(service.productToEdit).toBeTruthy();
    expect(service.productToEdit instanceof BehaviorSubject).toBeTrue();
  });

  it('should call createProduct() and return an Observable<Product>', () => {
    const mockProduct: Product = productMockValid
    service.createProduct(mockProduct).subscribe((product: Product) => {
      expect(product).toEqual(mockProduct);
    });
    const req = httpMock.expectOne(`${environment.URI}/bp/products`);
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct);
  });

  it('should call createProduct() and fail because passing duplicate id'  , () => {
    const mockProduct: Product = productMockInvalid
    const errorResponse = { status: 400, statusText: "Can't create because product is duplicate" };
    service.createProduct(productMockInvalid).subscribe({
      next :(product: Product) => {
        expect(product).toEqual(productMockInvalid);
      },
      error: (error) => {
        expect(error.status).toBe(400); 
        expect(error.statusText).toBe("Can't create because product is duplicate");
      }
    });
    const req = httpMock.expectOne(`${environment.URI}/bp/products`);
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct, errorResponse);
  });

  

  it('should call deleteProduct() and return an Observable<any>', () => {
    const mockProduct: Product = productMockValid
    service.deleteProduct(mockProduct.id).subscribe((product: any) => {
      expect(product).toEqual(mockProduct);
    });
    const req = httpMock.expectOne(`${environment.URI}/bp/products?id=${mockProduct.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockProduct);
  });

  it('should call getProducts() and return an Observable<Product[]>', () => {
    const mockProduct: Product[] = [productMockValid]
    service.getProducts().subscribe((products: Product[]) => {
      expect(products).toEqual(mockProduct);
    });
    const req = httpMock.expectOne(`${environment.URI}/bp/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should call updateProduct() and return an Observable<Product>', () => {
    const mockProduct: Product = productMockValid
    service.updateProduct(mockProduct).subscribe((product: Product) => {
      expect(product).toEqual(mockProduct);
    });
    const req = httpMock.expectOne(`${environment.URI}/bp/products`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockProduct);
  });


});
