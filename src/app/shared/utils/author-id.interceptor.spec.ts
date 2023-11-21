import { TestBed } from '@angular/core/testing';

import { AuthorIdInterceptor } from './author-id.interceptor';

describe('AuthorIdInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthorIdInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthorIdInterceptor = TestBed.inject(AuthorIdInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
