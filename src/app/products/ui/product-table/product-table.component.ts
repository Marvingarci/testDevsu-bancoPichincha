import { Component, InjectionToken, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Product } from '../../data-access/models/product';
import { ProductService } from '../../data-access/services/product.service';
import { PaginationService } from 'src/app/shared/data-access/pagination.service';
import { Router } from '@angular/router';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ProductCreateComponent } from '../../feature/product-create/product-create.component';
import { ConfirmationModalComponent } from 'src/app/shared/ui/confirmation-modal/confirmation-modal.component';
export const CLOSE_OVERLAY_TOKEN = new InjectionToken<() => void>('CLOSE_OVERLAY_TOKEN');


@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit{

  @Input() products: Product[] = [];
  @Input() searchTerm: string = '';
  $paginator = this.paginatorService.getPaginator();
  @ViewChild('overlayTemplate') overlayTemplate!: any;
  private overlayRef: OverlayRef | undefined;
  selected: string = '';
  constructor(
    private productService: ProductService,
    private paginatorService: PaginationService,
    private router: Router,
    private overlay: Overlay,
    private injector: Injector
  ) { }
  
  ngOnInit(): void {  
  }


  deleteProduct(Product: Product) {
    this.productService.productToDelete.next(Product);
     this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      disposeOnNavigation: true,
      panelClass: 'custom-dialog-container',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      height: '500px',
      width: '500px',


    });
    const injector = this.createInjectorWithCloseOverlay();
    const dialogPortal = new ComponentPortal(ConfirmationModalComponent, null, injector);
    const componentRef = this.overlayRef.attach(dialogPortal);    

    componentRef.instance.close.subscribe(() => {
      this.products = this.products.filter((product) => product.id !== Product.id);
    });
  }

  editProduct(product: Product){
    this.productService.productToEdit.next(product);
    this.router.navigate(['products/edit', product.id]);
  }

  closeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }

  }

  private createInjectorWithCloseOverlay(): Injector {
    return Injector.create({
      providers: [{ provide: CLOSE_OVERLAY_TOKEN, useValue: () => this.closeOverlay() }],
      parent: this.injector
    });
  }

}

