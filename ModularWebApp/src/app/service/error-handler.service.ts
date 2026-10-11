import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private readonly toastr = inject(ToastrService);

  handleError(error: any, context?: string): void {
    const message = this.extractErrorMessage(error);
    const title = context ? `${context} Error` : 'Error';
    this.toastr.error(message, title, {
      timeOut: 5000,
      positionClass: 'toast-bottom-right'
    });
  }

  handleSuccess(message: string, title: string = 'Success'): void {
    this.toastr.success(message, title, {
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    });
  }

  handleWarning(message: string, title: string = 'Warning'): void {
    this.toastr.warning(message, title, {
      timeOut: 4000,
      positionClass: 'toast-bottom-right'
    });
  }

  handleInfo(message: string, title: string = 'Info'): void {
    this.toastr.info(message, title, {
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    });
  }

  private extractErrorMessage(error: any): string {
    if (typeof error === 'string') {
      return error;
    }

    if (error?.error?.message) {
      return error.error.message;
    }

    if (error?.message) {
      return error.message;
    }

    if (error?.status && error?.statusText) {
      return `${error.status}: ${error.statusText}`;
    }

    return 'An unexpected error occurred';
  }
}
