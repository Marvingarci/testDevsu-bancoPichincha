import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { AppModule } from 'src/app/app.module';
import { ToastrModule } from 'ngx-toastr';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot({
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      })
      ],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
