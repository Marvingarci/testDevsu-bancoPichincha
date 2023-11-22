import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private paginator$: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({pageSize: 6, total: 0, page: 1});

  getPaginator(): Observable<Pagination>{
    return this.paginator$.asObservable();
  }

  updateTotal(total: number){
    let currentPagination = this.paginator$.getValue();
    this.paginator$.next({...currentPagination, total: total})
  }
  updatePage(page: number){
    let currentPagination = this.paginator$.getValue();
    this.paginator$.next({...currentPagination, page: page})
  }
  updatePageSize(pageSize: number){
    let currentPagination = this.paginator$.getValue();
    this.paginator$.next({...currentPagination, pageSize: pageSize})
  }
  constructor() { }
}
