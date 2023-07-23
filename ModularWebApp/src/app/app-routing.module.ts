import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingsService } from './service/settings.service';

@NgModule({
  imports: [RouterModule.forRoot([])],
  exports: [RouterModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (settings: SettingsService) => {
        return () => settings.loadSettings();
      },
      deps: [SettingsService],
      multi: true
    }]
})
export class AppRoutingModule { }
