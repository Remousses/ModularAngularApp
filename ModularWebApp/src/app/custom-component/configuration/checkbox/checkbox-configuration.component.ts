import { Component, inject, OnInit } from '@angular/core';
import { ComponentService } from '../../../service/component.service';
import { ComponentType } from '../../../util/constant/ComponentType';
import { Attribute } from '../../../interface/attribute.interface';

@Component({
  selector: 'app-checkbox-configuration',
  templateUrl: './checkbox-configuration.component.html',
  styleUrls: ['./checkbox-configuration.component.scss']
})
export class CheckboxConfigurationComponent implements OnInit {

  private componentService = inject(ComponentService);
  
  componentName = '';
  checked = false;
  indeterminate = false;

  ngOnInit() {}

  addComponentName(value: string) {
    this.componentName = value;
  }

  addComponent() {
    const attributes: Attribute[] = [
      {
        name: 'checked',
        type: 'Boolean',
        value: this.checked
      },
      {
        name: 'indeterminate',
        type: 'Boolean',
        value: this.indeterminate
      }
    ];
    this.componentService.add(this.componentName, ComponentType.CHECKBOX, attributes);
  }
}
