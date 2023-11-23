import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductMainComponent } from './product-main.component';
import { ProductShellModule } from '../product-shell/product-shell.module';
import { AppModule } from 'src/app/app.module';
import { ProductService } from '../../data-access/services/product.service';
import { PaginationService } from 'src/app/shared/data-access/pagination.service';
import { Product } from '../../data-access/models/product';
import { productsMockSuccess, productsMockError } from '../../utils/mocks/products.mock';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

fdescribe('ProductMainComponent', () => {
  let component: ProductMainComponent;
  let fixture: ComponentFixture<ProductMainComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let paginationService: jasmine.SpyObj<PaginationService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'productToEdit']);
    const paginationServiceSpy = jasmine.createSpyObj('PaginationService', ['updateTotal']);

    await TestBed.configureTestingModule({
      declarations: [ProductMainComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: PaginationService, useValue: paginationServiceSpy }
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    paginationService = TestBed.inject(PaginationService) as jasmine.SpyObj<PaginationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMainComponent);
    component = fixture.componentInstance;
    productService.getProducts.and.returnValue(of([])); 
    productService.productToEdit = { next: jasmine.createSpy('next') } as any; 
    fixture.detectChanges();
  });



  it('Product main debera renderizarse', () => {
    expect(component).toBeTruthy();
  });

  it('Debera obtener todos los productos y actualizar la cantida en paginacion', () => {
    const products: Product[] = productsMockSuccess;
    productService.getProducts.and.returnValue(of(products));
    component.ngOnInit(); 
    expect(productService.getProducts).toHaveBeenCalled();
    expect(paginationService.updateTotal).toHaveBeenCalledWith(products.length);
  });
});
