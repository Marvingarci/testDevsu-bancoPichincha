import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagination } from '../../models/pagination';
import { ProductService } from 'src/app/products/data-access/services/product.service';
import { PaginationService } from '../../data-access/pagination.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  readonly paginatorService = inject(PaginationService);
  paginator$: Observable<Pagination> = this.paginatorService.getPaginator();
  @Output() paginatorChange: EventEmitter<Pagination> = new EventEmitter<Pagination>();


  onChangePaginationSize(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.paginatorService.updatePageSize(parseInt(value));
  }
}
