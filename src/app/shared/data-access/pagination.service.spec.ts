import { TestBed } from '@angular/core/testing';

import { PaginationService } from './pagination.service';
import { take } from 'rxjs';

describe('PaginationService', () => {
  let service: PaginationService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update total', () => {
    const total = 10;
    service.updateTotal(total);
    service.getPaginator().pipe(take(1)).subscribe((pagination) => {
      expect(pagination.total).toEqual(total);
    });
  });

  it('should update page in paginator$', () => {
    const page = 3;
    service.updatePage(page);
    service.getPaginator().pipe(take(1)).subscribe((pagination) => {
      expect(pagination.page).toEqual(page);
    });
  });

  it('should update pageSize in paginator$', () => {
    const pageSize = 15;
    service.updatePageSize(pageSize);
    service.getPaginator().pipe(take(1)).subscribe((pagination) => {
      expect(pagination.pageSize).toEqual(pageSize);
    });
  });

});
