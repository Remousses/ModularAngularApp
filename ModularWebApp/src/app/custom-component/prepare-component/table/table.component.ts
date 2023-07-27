import { Component, Input, OnInit } from '@angular/core';
import { KnowOurDatasAbstract } from 'src/app/abstract/KnowOurDatas.abstract';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends KnowOurDatasAbstract implements OnInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];

  ngOnInit() {
    this.load(this);
  }
}
