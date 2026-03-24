import { Component, OnInit, inject } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { GlobalConfigurationComponent } from './custom-component/configuration/global-configuration.component';
import { PagesFacade } from './+state/pages.facade';

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
  private readonly pagesFacade = inject(PagesFacade);
  pages = this.pagesFacade.pages;
  

  ngOnInit() {
    this.pagesFacade.loadAllPages();
  }
}
