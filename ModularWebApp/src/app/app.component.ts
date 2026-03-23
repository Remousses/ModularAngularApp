import { Component, OnInit, inject } from '@angular/core';
import { PageService } from './service/page.service';
import { Page } from './interface/page.interface';

import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { GlobalConfigurationComponent } from './custom-component/configuration/global-configuration.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    GlobalConfigurationComponent
],
    standalone: true
})
export class AppComponent implements OnInit {
  private readonly pageService = inject(PageService);
  pages: Page[] = []
  

  ngOnInit() {
    this.pages = this.pageService.getLoadedPages();
  }
}
