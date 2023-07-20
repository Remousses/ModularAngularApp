import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CheckboxComponent } from '../../checkbox/checkbox.component';
import { PageService } from 'src/app/service/page.service';
import { ComponentService } from 'src/app/service/component.service';
import { CustomComponent } from 'src/app/interface/component.interface';

@Component({
  selector: 'app-checkbox-configuration',
  templateUrl: './checkbox-configuration.component.html',
  styleUrls: ['./checkbox-configuration.component.scss']
})
export class CheckboxConfigurationComponent implements OnInit, AfterViewInit  {
  componentName = '';
  checked = false;
  indeterminate = false;
  saved = false;
  @ViewChild(CheckboxComponent) checkbox!: CheckboxComponent;

  constructor(private pageService: PageService, private componentService: ComponentService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    // this.checked = this.checkbox.checked;
  }

  save() {
    if (this.componentName) {
      this.checked = this.checkbox.checked;
      this.saved = true;
    }
  }

  integrate() {
    const page = this.pageService.getCurrentPage();
    if (page.id) {
      const component: CustomComponent = {
        name: this.componentName
      };
      this.componentService.addComponent(page.id, component);
    }
  }
}
