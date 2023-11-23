import { PaginationService } from 'src/app/shared/data-access/pagination.service';
import { FilterTablePipe } from './filter-table.pipe';
import { productsMocksMapped } from './mocks/products.mock';

describe('FilterTablePipe', () => {
  it('create an instance', () => {
    const paginationService = new PaginationService()
    const pipe = new FilterTablePipe(paginationService);
    expect(pipe).toBeTruthy();
  });

  it('should return products when search is empty', () => {
    const paginationService = new PaginationService()
    const pipe = new FilterTablePipe(paginationService);
    const products = productsMocksMapped
    const result = pipe.transform(products, '', 10);
    expect(result).toEqual(products);
  });

  it('should return one when search == "Golden"', () => {
    const paginationService = new PaginationService()
    const pipe = new FilterTablePipe(paginationService);
    const products = productsMocksMapped
    const result = pipe.transform(products, 'Golden', 10);
    expect(result.length).toEqual(1);
  });

  it('should return empty when search == "Latafa"', () => {
    const paginationService = new PaginationService()
    const pipe = new FilterTablePipe(paginationService);
    const products = productsMocksMapped
    const result = pipe.transform(products, 'Latafa', 10);
    expect(result.length).toEqual(0);
  })

  it('it should return 1 when pageSize == 1', () => {
    const paginationService = new PaginationService()
    const pipe = new FilterTablePipe(paginationService);
    const products = productsMocksMapped
    const result = pipe.transform(products, '', 1);
    expect(result.length).toEqual(1);
  })


});
