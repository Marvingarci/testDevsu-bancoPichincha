import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private readonly toastr: ToastrService) {} 
  
  showSuccess(message: string) {
    this.toastr.success(message, '');
  }
  showFailure(message: string) {
    this.toastr.error(message, '');
  }
  showWarning(message: string) {
    this.toastr.warning(message, '');
  }

}
