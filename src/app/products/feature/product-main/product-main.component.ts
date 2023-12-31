import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductService } from '../../data-access/services/product.service';
import { Observable, delay, map, tap } from 'rxjs';
import { Product } from '../../data-access/models/product';
import { PaginationService } from 'src/app/shared/data-access/pagination.service';
import { ProductResponseMapper } from '../../utils/product-reponse.mapper';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss']
})
export class ProductMainComponent implements OnInit {
  products$ : Observable<Product[]> = new Observable<Product[]>();
  searchValue: string = '';
  @ViewChild('dialog') dialogTemplate: any;
  constructor(
    private productService: ProductService,
    private paginatorService: PaginationService,
    ) { }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(){
    this.products$ = this.productService.getProducts().pipe(
      tap((products: Product[]) => {
        this.paginatorService.updateTotal(products.length as number)
      }),
      map((products: Product[]) => this.mapProducts(products)),
    );
  }
  
  mapProducts(products: Product[]){
   return products.map((product: Product) => ProductResponseMapper.fromResponse(product))
  }
  cleanProduct(){
    this.productService.productToEdit.next(null);
  }

}
