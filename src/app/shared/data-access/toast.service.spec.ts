import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('ToastService', () => {
  let service: ToastService;
  let toastrService: ToastrService;
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
    toastrService = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch showSucess', () => {
    const spy = spyOn(toastrService, 'success').and.callThrough();
    service.showSuccess('test');
    expect(spy).toHaveBeenCalledWith('test', '');
  });

  it('should dispatch failure', () => {
    const spy = spyOn(toastrService, 'error').and.callThrough();
    service.showFailure('test');
    expect(spy).toHaveBeenCalledWith('test', '');
  });

  it('should show warning', () => {
    const spy = spyOn(toastrService, 'warning');
    service.showWarning('test');
    expect(spy).toHaveBeenCalledWith('test', '');
  });



});
