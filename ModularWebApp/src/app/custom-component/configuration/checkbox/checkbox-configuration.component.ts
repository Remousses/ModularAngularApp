import { Component, inject, OnDestroy } from '@angular/core';
import { ComponentService } from '../../../service/component.service';
import { ComponentTypeConstant } from '../../../util/constant/component-type.constant';
import { Attribute } from '../../../interface/attribute.interface';
import { ComponentNameComponent } from '../component-name/component-name.component';
import { CheckboxComponent } from '../../prepare-component/checkbox/checkbox.component';
import { MatButton } from '@angular/material/button';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-checkbox-configuration',
    templateUrl: './checkbox-configuration.component.html',
    imports: [ComponentNameComponent, CheckboxComponent, MatButton],
    standalone: true
})
export class CheckboxConfigurationComponent implements OnDestroy {

  private readonly componentService = inject(ComponentService);
  private readonly destroy$ = new Subject<void>();

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
    const result = this.componentService.add(this.componentName, ComponentTypeConstant.CHECKBOX, attributes);
    if (result) {
      result.pipe(takeUntil(this.destroy$)).subscribe();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
