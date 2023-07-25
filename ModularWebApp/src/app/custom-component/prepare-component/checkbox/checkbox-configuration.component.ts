import { Component, OnInit, ViewChild } from '@angular/core';
import { CheckboxComponent } from '../../checkbox/checkbox.component';
import { PageService } from 'src/app/service/page.service';
import { ComponentService } from 'src/app/service/component.service';

@Component({
  selector: 'app-checkbox-configuration',
  templateUrl: './checkbox-configuration.component.html',
  styleUrls: ['./checkbox-configuration.component.scss']
})
export class CheckboxConfigurationComponent implements OnInit  {
  componentName = '';
  checked = false;
  indeterminate = false;
  saved = false;
  @ViewChild(CheckboxComponent) checkbox!: CheckboxComponent;

  constructor(private pageService: PageService, private componentService: ComponentService) {}

  ngOnInit() {}

  save() {
    if (this.componentName) {
      const page = this.pageService.getCurrentPage();
      if (page.id) {
        // const customComponent: CustomComponent = {
        //   name: this.componentName,
        //   type: 'Checkbox'
        // };
        // this.componentService.addComponent(page.id, customComponent);
      }
    }
  }

}
