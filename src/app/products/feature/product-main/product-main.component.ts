import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../data-access/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../data-access/models/product';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss']
})
export class ProductMainComponent implements OnInit {
  products$ : Observable<Product[]> = new Observable<Product[]>();
  constructor(
    private productService: ProductService
  ) { }


  ngOnInit(): void {
    this.products$ = this.productService.getProducts()
  }

}
