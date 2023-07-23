import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
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
  page!: Page;

  constructor(private activatedRoute: ActivatedRoute, private componentService: ComponentService, private pageService: PageService) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.page = data.page
    });
  }

  dragEnd(event: CdkDragEnd, page: Page, customComponent: CustomComponent) {
    customComponent.page = page;
    customComponent.dropPoint = event.dropPoint;
    this.componentService.save(customComponent).subscribe(data => {
      this.pageService.updateSessionPageCustomComponents(page, data);
    });
  }
}
