import { Component, OnInit, inject } from '@angular/core';
import { Attribute } from 'src/app/interface/attribute.interface';
import { TableInformationService } from 'src/app/service/table-information.service';
import { QueryBuilderUtil } from 'src/app/util/query-builder.util';

@Component({
  selector: 'app-table-configuration',
  templateUrl: './table-configuration.component.html',
  styleUrls: ['./table-configuration.component.scss']
})
export class TableConfigurationComponent implements OnInit {

  private readonly tableInformationService = inject(TableInformationService);

  componentName = '';
  displayedColumnsFromDb: string[] = [];
  displayedColumnsUrl: string = '';
  datasUrl: string = '';
  datasUrlFromInternal: string = '';
  loadData = false;
  tablesInformations: any[] = [];
  tableFieldsName: string[] = [];
  tableNameSelected = '';
  tableFieldsSelected: string[] = [];
  callFromDatabase = true;

  ngOnInit(): void {
    this.getTableInformations();
  }

  addComponentName(value: string) {
    this.componentName = value;
  }

  addComponent() {
    let attributes: Attribute[];
    if (this.callFromDatabase) {
      // this.displayedColumnsFromDb = await lastValueFrom(this.queryBuilderService.getFromCustomQuery(this.tableNameSelected, this.tableFieldsSelected));
      attributes = [
        {
          name: 'displayedColumnsFromDb',
          type: 'Array',
          value: this.displayedColumnsFromDb
        },
        {
          name: 'datasUrlFromInternal',
          type: 'String',
          value: this.datasUrlFromInternal
        }
      ]
    } else {
      attributes = [
        {
          name: 'displayedColumnsUrl',
          type: 'String',
          value: this.displayedColumnsUrl
        },
        {
          name: 'datasUrl',
          type: 'String',
          value: this.datasUrl
        }
      ];
    }
    console.log(attributes);
    
    // this.componentService.add(this.componentName, ComponentTypeConstant.TABLE, attributes);
  }

  getTableInformations() {
    this.tableInformationService.get().subscribe(info => {
      this.tablesInformations.length = 0;
      this.tableFieldsName.length = 0;
      Object.entries(info).forEach(value => {
        this.tablesInformations.push({
          name: value[0],
          fields: value[1]
        });
      });
    });
  }

  tableInformationChange() {
    this.tableFieldsSelected.length = 0;
    const dropDownData = this.tablesInformations.find((data: any) => data.name === this.tableNameSelected);
    if (dropDownData) {
      this.tableFieldsName = dropDownData.fields;

      if(this.tableFieldsName){
        this.tableFieldsSelected = [this.tableFieldsName[0]];
        this.tableFieldsChange();
      }
    } else {
      this.tableFieldsName = [];
    }
    this.datasUrlFromInternal = QueryBuilderUtil.getCustomQueryUrl(this.tableNameSelected);
  }

  tableFieldsChange() {
    this.displayedColumnsFromDb = this.tableFieldsSelected.map(e => e.split('#')[0]);
  }
}
