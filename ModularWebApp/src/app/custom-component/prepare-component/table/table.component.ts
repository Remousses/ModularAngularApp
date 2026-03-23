import { Component, inject, OnInit, input } from '@angular/core';
import { forkJoin } from 'rxjs';
import { KnowOurDatasAbstract } from 'src/app/abstract/KnowOurDatas.abstract';
import { ApiService } from 'src/app/service/api.service';
import { QueryBuilderService } from 'src/app/service/query-builder.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [
    MatTableModule
  ],
  standalone: true,
})
export class TableComponent extends KnowOurDatasAbstract implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly querBuilderService = inject(QueryBuilderService);

  readonly displayedColumnsUrl = input.required<string>();
  readonly datasUrl = input.required<string>();
  readonly displayedColumnsFromDb = input<string[]>();
  readonly datasUrlFromInternal = input<string>();

  displayedColumns: string[] | undefined = [];
  dataSource: any[] = [];

  ngOnInit() {
    const displayedColumnsUrl = this.displayedColumnsUrl();
    const datasUrl = this.datasUrl();
    const displayedColumnsFromDb = this.displayedColumnsFromDb();
    const datasUrlFromInternal = this.datasUrlFromInternal();
    if (displayedColumnsUrl && datasUrl) {
      const $displayColumns = this.apiService.get(displayedColumnsUrl);
      const $dataSource = this.apiService.get(datasUrl);

      forkJoin([$displayColumns, $dataSource]).subscribe(
        ([displayColumns, dataSource]) => {
          this.displayedColumns = displayColumns;
          this.dataSource = dataSource;
          this.load(this);
        },
      );
    } else if (displayedColumnsFromDb && datasUrlFromInternal) {
      this.querBuilderService
        .getFromCustomQuery(
          datasUrlFromInternal,
          displayedColumnsFromDb,
        )
        .subscribe((res) => {
          this.dataSource = res;
          this.displayedColumns = this.displayedColumnsFromDb();
        });
    }
  }
}
