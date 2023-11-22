import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../data-access/models/product';
import { ProductService } from '../../data-access/services/product.service';
import { PaginationService } from 'src/app/shared/data-access/pagination.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit{

  @Input() products: Product[] = [];
  @Input() searchTerm: string = '';
  $paginator = this.paginatorService.getPaginator();
  constructor(
    private productService: ProductService,
    private paginatorService: PaginationService
  ) { }
  
  ngOnInit(): void {  
    // this.paginatorService.getPaginator().subscribe((pagination) => {
    //   this.products = this.products.slice(0, pagination.pageSize as number);
    // });
  }

}
