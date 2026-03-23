import { Component, inject, OnInit } from '@angular/core';
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
export class DragAndDropComponent implements OnInit {

  private readonly XY_REGEX = /(\d+)px/g;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly componentService = inject(ComponentService);
  private readonly pageService = inject(PageService);
  page!: Page;

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.page = data.page
    });
  }

  removeComponent(comp: CustomComponent) {
    this.componentService.deleteById(comp);
  }

  dragEnd(event: any, page: Page, customComponent: CustomComponent, div: HTMLDivElement) {
    const dropPoint = this.retrieveXY(div.style.transform);
    
    if (customComponent.id) {
      this.componentService.savePosition(customComponent.id, dropPoint).subscribe(data => {
        this.pageService.addSessionPageCustomComponents(page.id!, data);
      });
    }
  }

  retrieveXY(inputString: string) {
    const matches = [];
    let match;
    while ((match = this.XY_REGEX.exec(inputString)) !== null) {
      matches.push(Number(match[1]));
    }
    
    return {
      x: matches[0],
      y: matches[1]
    };
  }
}
