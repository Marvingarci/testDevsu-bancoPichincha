import { Component, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/products/data-access/services/product.service';
import { Product } from 'src/app/products/data-access/models/product';
import { ToastService } from '../../data-access/toast.service';
import { CLOSE_OVERLAY_TOKEN, ProductTableComponent } from 'src/app/products/ui/product-table/product-table.component';
import { ProductShellModule } from 'src/app/products/feature/product-shell/product-shell.module';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  productToDelete : Product | null = this.productService.productToDelete.value;
  close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private productService: ProductService,
    private toastr: ToastService,
    @Inject(CLOSE_OVERLAY_TOKEN) private closeOverlay: () => void
  ) {}
  onConfirm(){
    this.productService.deleteProduct(this.productToDelete?.id as string).subscribe(
      {
        next: (response) => {
          console.log(response)
          this.productService.productToDelete.next(null);
          this.toastr.showSuccess('Producto eliminado exitosamente');
          this.close.emit();
          this.closeOverlay();
        },
        error: (err) => {
          if(err.error.text == 'Product successfully removed'){
            this.productService.productToDelete.next(null);
            this.toastr.showSuccess('Producto eliminado exitosamente');
            this.close.emit();
            this.closeOverlay();

          }
        }
      }
    )

  }

  onCancel(){ 
    this.productService.productToDelete.next(null);
    this.closeOverlay();
  }
}
