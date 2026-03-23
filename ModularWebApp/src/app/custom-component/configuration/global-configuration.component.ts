import { Component, inject } from '@angular/core';
import { KnowOurDatasAbstract } from 'src/app/abstract/KnowOurDatas.abstract';
import { PageService } from 'src/app/service/page.service';

@Component({
  selector: 'app-global-configuration',
  templateUrl: './global-configuration.component.html'
})
export class GlobalConfigurationComponent extends KnowOurDatasAbstract {

  pageService = inject(PageService);

  allDatas: any[] = [];
  isShowDatas = false;

  showDatas() {
    this.isShowDatas = !this.isShowDatas

    if (this.isShowDatas) {
      this.allDatas = this.displayDatas();
    }
  }
}
