import { Component, inject, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { KnowOurDatasAbstract } from 'src/app/abstract/KnowOurDatas.abstract';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends KnowOurDatasAbstract implements OnInit {
  
  private apiService = inject(ApiService);
  
  @Input({ required: true }) displayedColumnsUrl: string = '';
  @Input({ required: true }) datasUrl: string = '';

  displayedColumns: string[] = [];
  dataSource: any[] = [];

  ngOnInit() {
    if (this.displayedColumnsUrl && this.datasUrl) {
      const $displayColumns = this.apiService.get(this.displayedColumnsUrl);
      const $dataSource = this.apiService.get(this.datasUrl);

      forkJoin([$displayColumns, $dataSource]).subscribe(([displayColumns, dataSource]) => {
        this.displayedColumns = displayColumns;
        this.dataSource = dataSource;
        this.load(this);
      });
    }
  }
}
