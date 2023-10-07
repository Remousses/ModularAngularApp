import { Component, OnInit } from '@angular/core';
import { KnowOurDatasAbstract } from 'src/app/abstract/KnowOurDatas.abstract';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends KnowOurDatasAbstract implements OnInit {

  ngOnInit() {
    this.load(this);
  }
}
