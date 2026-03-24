import { Component, inject } from '@angular/core';
import { KnowOurDatasAbstract } from 'src/app/abstract/KnowOurDatas.abstract';
import { MatButton } from '@angular/material/button';

import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { CreatePageComponent } from '../../create-page/create-page.component';
import { CheckboxConfigurationComponent } from './checkbox/checkbox-configuration.component';
import { TableConfigurationComponent } from './table/table-configuration.component';
import { PagesFacade } from 'src/app/+state/pages.facade';

@Component({
  selector: 'app-global-configuration',
  templateUrl: './global-configuration.component.html',
  imports: [
    MatButton,
    NgxJsonViewerModule,
    CreatePageComponent,
    CheckboxConfigurationComponent,
    TableConfigurationComponent,
  ],
  standalone: true,
})
export class GlobalConfigurationComponent extends KnowOurDatasAbstract {
  readonly pagesFacade = inject(PagesFacade);

  allDatas: any[] = [];
  isShowDatas = false;

  showDatas() {
    this.isShowDatas = !this.isShowDatas;

    if (this.isShowDatas) {
      this.allDatas = this.displayDatas();
    }
  }

  reloadPages() {
    this.pagesFacade.loadAllPages();
  }
}
