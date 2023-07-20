import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { CheckboxComponent } from '../custom-component/checkbox/checkbox.component';
import { Page } from '../interface/page.interface';
import { PageService } from '../service/page.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent {
  static readonly TYPE_MAP: any = {
    'checkbox': CheckboxComponent
  };

  page!: Page;

  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.pageService.findCurrentPage()
    this.page = this.pageService.getCurrentPage();
  }

  dragEnd(event: CdkDragEnd, componentId: number | undefined) {
    console.log(event, componentId);
    // this.pie = event.dropPoint;
  }
}
