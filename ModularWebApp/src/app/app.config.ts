import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { SettingsService } from './service/settings.service';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    provideAppInitializer(() => {
        const settingsService = inject(SettingsService);
        return settingsService.loadSettings();
    })
  ]
};