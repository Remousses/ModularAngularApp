import { Component, inject } from '@angular/core';
import { ComponentService } from '../../../service/component.service';
import { ComponentTypeConstant } from '../../../util/constant/component-type.constant';
import { Attribute } from '../../../interface/attribute.interface';

@Component({
  selector: 'app-checkbox-configuration',
  templateUrl: './checkbox-configuration.component.html',
  styleUrls: ['./checkbox-configuration.component.scss']
})
export class CheckboxConfigurationComponent {

  private componentService = inject(ComponentService);

  componentName = '';
  checked = false;
  indeterminate = false;

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
    this.componentService.add(this.componentName, ComponentTypeConstant.CHECKBOX, attributes);
  }
}
