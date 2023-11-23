import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CLOSE_OVERLAY_TOKEN, ProductTableComponent } from './product-table.component';
import { AppModule } from 'src/app/app.module';
import { ProductShellModule } from '../../feature/product-shell/product-shell.module';
import { ProductService } from '../../data-access/services/product.service';
import { PaginationService } from 'src/app/shared/data-access/pagination.service';
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationModalComponent } from 'src/app/shared/ui/confirmation-modal/confirmation-modal.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { productMockEdit } from '../../utils/mocks/products.mock';
import { Router } from '@angular/router';
import { Product } from '../../data-access/models/product';
import { Injector } from '@angular/core';

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;
  let productService: ProductService;
  let paginatorService: PaginationService;
  let overlayRef: OverlayRef;
  let overlay: Overlay;
  let router: Router;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductTableComponent],
      imports: [AppModule, ProductShellModule, OverlayModule, RouterTestingModule],
      providers: [
        ProductService,
        PaginationService,
        { provide: CLOSE_OVERLAY_TOKEN, useValue: () => {} } // Mock CLOSE_OVERLAY_TOKEN
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService);
    paginatorService = TestBed.inject(PaginationService);
    overlay = TestBed.inject(Overlay);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;

    component.products = [
      // Mock products here
    ];

    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete product and close overlay on confirmation', () => {
    const deleteProductSpy = spyOn(component, 'deleteProduct').and.callThrough();
    const closeOverlaySpy = spyOn(component, 'closeOverlay').and.callThrough();
    
    overlayRef = overlay.create({
      hasBackdrop: true,
      positionStrategy: overlay.position().global().centerHorizontally().centerVertically(),
      disposeOnNavigation: true,
      panelClass: 'custom-dialog-container',
      scrollStrategy: overlay.scrollStrategies.block(),
      height: '500px',
      width: '500px',

    });
    const dialogPortal = new ComponentPortal(ConfirmationModalComponent, null);
    
    const overlayCreateSpy = spyOn(overlay, 'create').and.returnValue(overlayRef);
    component.deleteProduct({} as any);

    expect(deleteProductSpy).toHaveBeenCalled();
    expect(overlayCreateSpy).toHaveBeenCalled();


    component.closeOverlay();
    expect(closeOverlaySpy).toHaveBeenCalled();

  });

  it('should navigate to edit product', () => {
    const product: Product = productMockEdit;
    const productServiceSpy = spyOn(productService.productToEdit, 'next');
    const routerSpy = spyOn(router, 'navigate'); 
  
    component.editProduct(product);

    expect(productServiceSpy).toHaveBeenCalledWith(product);
    expect(routerSpy).toHaveBeenCalledWith(['products/edit', product.id]); 
  });

  it('should create an injector with close overlay token provider', () => {
    const injector: Injector = component.createInjectorWithCloseOverlay();

    const closeOverlayFn = injector.get(CLOSE_OVERLAY_TOKEN);

    expect(closeOverlayFn).toBeDefined();
    expect(typeof closeOverlayFn).toBe('function');
  });

});
