import { Component, Input } from '@angular/core';
import { Product } from '../../data-access/models/product';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {

  @Input() products: Product[] = [];
  @Input() searchTerm: string = '';
  
}
