import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { PaginationService } from '../../data-access/pagination.service';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let paginationService: PaginationService; 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent]
    });
    paginationService = TestBed.inject(PaginationService);
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`paginatorService should be injected`, () => {
    expect(component.paginatorService).toBeTruthy();
  });

  it(`paginator$ should be an Observable`, () => {
    expect(component.paginator$).toBeTruthy();
  });

  it(`paginatorChange should be an EventEmitter`, () => {
    expect(component.paginatorChange).toBeTruthy();
  });

  it(`onChangePaginationSize should call paginatorService.updatePageSize`, () => {
    spyOn(paginationService, 'updatePageSize');
    const event: any = { target: { value: 'test' } };
    component.onChangePaginationSize(event as any);
    expect(paginationService.updatePageSize).toHaveBeenCalledWith(parseInt('test'));
  });

});
