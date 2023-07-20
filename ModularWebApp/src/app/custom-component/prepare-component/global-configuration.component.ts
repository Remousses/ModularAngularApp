import { Component, OnInit } from '@angular/core';
import { KnowOurDatasAbstract } from 'src/app/abstract/KnowOurDatas.abstract';

@Component({
  selector: 'app-global-configuration',
  templateUrl: './global-configuration.component.html',
  styleUrls: ['./global-configuration.component.scss']
})
export class GlobalConfigurationComponent extends KnowOurDatasAbstract implements OnInit {
  allDatas: any[] = [];

  ngOnInit() {}

  showDatas() {
    this.allDatas = this.displayDatas();
  }
}
