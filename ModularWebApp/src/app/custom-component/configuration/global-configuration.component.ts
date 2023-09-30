import { Component, OnInit, inject } from '@angular/core';
import { KnowOurDatasAbstract } from 'src/app/abstract/KnowOurDatas.abstract';
import { PageService } from 'src/app/service/page.service';

@Component({
  selector: 'app-global-configuration',
  templateUrl: './global-configuration.component.html',
  styleUrls: ['./global-configuration.component.scss']
})
export class GlobalConfigurationComponent extends KnowOurDatasAbstract implements OnInit {

  pageService = inject(PageService);

  allDatas: any[] = [];
  isShowDatas = false;

  ngOnInit() {}

  showDatas() {
    this.isShowDatas = !this.isShowDatas

    if (this.isShowDatas) {
      this.allDatas = this.displayDatas();
    }
  }
}
