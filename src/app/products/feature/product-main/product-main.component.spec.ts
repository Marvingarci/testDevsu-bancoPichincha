import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductMainComponent } from './product-main.component';
import { ProductShellModule } from '../product-shell/product-shell.module';
import { AppModule } from 'src/app/app.module';
import { ProductService } from '../../data-access/services/product.service';
import { PaginationService } from 'src/app/shared/data-access/pagination.service';
import { Product } from '../../data-access/models/product';
import { productsMockSuccess } from '../../utils/mocks/products.mock';
import { map, of } from 'rxjs';
import { ProductResponseMapper } from '../../utils/product-reponse.mapper';

describe('ProductMainComponent', () => {
  let component: ProductMainComponent;
  let fixture: ComponentFixture<ProductMainComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let paginationService: jasmine.SpyObj<PaginationService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'productToEdit']);
    const paginationServiceSpy = jasmine.createSpyObj('PaginationService', ['updateTotal', 'getPaginator']);

    await TestBed.configureTestingModule({
      declarations: [ProductMainComponent],
      imports: [ProductShellModule, AppModule],
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



  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('Should get all the products', fakeAsync((done: any) => {
    const products: Product[] = productsMockSuccess;
    productService.getProducts.and.returnValue(of(products));

    component.ngOnInit()
    
    expect(component.products$).toBeDefined();
    expect(productService.getProducts).toHaveBeenCalled();
    expect(paginationService.updateTotal).toHaveBeenCalled();

  }));

  it('Should map the products before setting in the observable', fakeAsync((done: any) => {
    const products: Product[] = productsMockSuccess;
    const spyMapper = spyOn(component, 'mapProducts').and.callThrough();
    const mappedProducts = component.mapProducts(products);
    expect(spyMapper).toHaveBeenCalled();
    expect(mappedProducts).toEqual(products.map((product: Product) => ProductResponseMapper.fromResponse(product)));
  }
  ));

  it('should reset the product before route to New', () => {
    component.cleanProduct();
    expect(productService.productToEdit.next).toHaveBeenCalledWith(null);
  });
});
