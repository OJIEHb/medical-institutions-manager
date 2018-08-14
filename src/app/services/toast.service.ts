import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {

  private options = {
    positionClass: 'toast-bottom-right',
    disableTimeOut: true,
    closeButton: true,
    preventDuplicates: true,
  }

  constructor(private toastr: ToastrService) { }

  showWarning(title: string, message: string, callback) {
    this.toastr.warning(message, title, this.options).onTap.subscribe(callback)
  }

  dismissAll() {
    this.toastr.clear();
  }
}
