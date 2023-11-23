import { PaginationService } from 'src/app/shared/data-access/pagination.service';
import { FilterTablePipe } from './filter-table.pipe';

describe('FilterTablePipe', () => {
  it('create an instance', () => {
    const paginationService = new PaginationService()
    const pipe = new FilterTablePipe(paginationService);
    expect(pipe).toBeTruthy();
  });
});
