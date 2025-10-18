import { Component, inject, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { KnowOurDatasAbstract } from 'src/app/abstract/KnowOurDatas.abstract';
import { ApiService } from 'src/app/service/api.service';
import { QueryBuilderService } from 'src/app/service/query-builder.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends KnowOurDatasAbstract implements OnInit {
  
  private apiService = inject(ApiService);
  private querBuilderService = inject(QueryBuilderService);
  
  @Input({ required: true }) displayedColumnsFromDb: string[] = [];
  @Input({ required: true }) datasUrlFromDb: string = '';
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
    } else if (this.displayedColumnsFromDb && this.datasUrlFromDb) {
      this.querBuilderService.getFromCustomQuery(this.datasUrlFromDb, this.displayedColumnsFromDb).subscribe(res =>{
        this.dataSource = res;
        this.displayedColumns = this.displayedColumnsFromDb;
      });
    }
  }
}
