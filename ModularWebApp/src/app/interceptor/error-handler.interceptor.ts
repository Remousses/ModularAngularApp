import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../service/error-handler.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  private readonly errorHandler = inject(ErrorHandlerService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const context = `${req.method} ${req.url}`;
        this.errorHandler.handleError(error, context);
        return throwError(() => error);
      })
    );
  }
}
