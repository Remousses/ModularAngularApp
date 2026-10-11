import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { SettingsService } from './service/settings.service';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ErrorHandlerInterceptor } from './interceptor/error-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true
    }),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    provideAppInitializer(() => {
        const settingsService = inject(SettingsService);
        return settingsService.loadSettings();
    })
  ]
};