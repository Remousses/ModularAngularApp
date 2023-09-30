import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { Page } from '../interface/page.interface';
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from '../service/component.service';
import { CustomComponent } from '../interface/component.interface';
import { PageService } from '../service/page.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent {

  private activatedRoute = inject(ActivatedRoute);
  private componentService = inject(ComponentService);
  private pageService = inject(PageService);
  page!: Page;

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.page = data.page
    });
  }

  dragEnd(event: CdkDragEnd, page: Page, customComponent: CustomComponent) {
    if (customComponent.id) {
      this.componentService.savePosition(customComponent.id, event.dropPoint).subscribe(data => {
        this.pageService.updateSessionPageCustomComponents(page, data);
      });
    }
  }
}
