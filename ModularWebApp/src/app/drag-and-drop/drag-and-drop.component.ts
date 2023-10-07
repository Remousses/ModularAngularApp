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

  private readonly XY_REGEX = /(\d+)px/g;
  private activatedRoute = inject(ActivatedRoute);
  private componentService = inject(ComponentService);
  private pageService = inject(PageService);
  page!: Page;

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.page = data.page
    });
  }

  dragEnd(event: any, page: Page, customComponent: CustomComponent, div: HTMLDivElement) {
    console.log(event);
    
    const dropPoint = this.retrieveXY(div.style.transform);
    console.log(dropPoint);
    
    if (customComponent.id) {
      this.componentService.savePosition(customComponent.id, dropPoint).subscribe(data => {
        this.pageService.updateSessionPageCustomComponents(page, data);
      });
    }
  }

  retrieveXY(inputString: string) {
    const matches = [];
    let match;
    while ((match = this.XY_REGEX.exec(inputString)) !== null) {
      matches.push(match[1]);
    }
    console.log(matches);
    
    return {
      x: matches[0],
      y: matches[1]
    };
  }
}
