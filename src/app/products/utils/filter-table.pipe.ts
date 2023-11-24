import { Pipe, PipeTransform, inject } from '@angular/core';
import { Product } from '../data-access/models/product';
import { ProductService } from '../data-access/services/product.service';
import { PaginationService } from 'src/app/shared/data-access/pagination.service';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {

  constructor(private paginationService: PaginationService) {}
  transform(products: Product[], search: string, pageSize: number): Product[] {
    if (search === '') {
      this.paginationService.updateTotal(products.length);
      return products.slice(0, pageSize as number);
    }

    const p = products.filter(product => 
      product.id.toString().includes(search.toLowerCase()) ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.date_release.toString().includes(search.toLowerCase()) ||
      product.date_revision.toLowerCase().includes(search.toLowerCase())
    )
    this.paginationService.updateTotal(p.length);
    return p.slice(0, pageSize as number);
  }

}
