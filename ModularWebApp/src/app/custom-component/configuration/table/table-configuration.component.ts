import { Component, inject } from '@angular/core';
import { Attribute } from 'src/app/interface/attribute.interface';
import { ComponentService } from 'src/app/service/component.service';
import { ComponentType } from 'src/app/util/constant/ComponentType';

@Component({
  selector: 'app-table-configuration',
  templateUrl: './table-configuration.component.html',
  styleUrls: ['./table-configuration.component.scss']
})
export class TableConfigurationComponent {

  private componentService = inject(ComponentService);

  componentName = '';
  displayedColumnsUrl: string = 'http://localhost:8082/api/v1/api-mock/table/columns';
  datasUrl: string = 'http://localhost:8082/api/v1/api-mock/table/datas';
  loadData = false;

  addComponentName(value: string) {
    this.componentName = value;
  }

  addComponent() {
    const attributes: Attribute[] = [
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
    this.componentService.add(this.componentName, ComponentType.TABLE, attributes);
  }
}
