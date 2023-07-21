import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Page } from '../interface/page.interface';
import { PageService } from '../service/page.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent {
  page!: Page;

  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.pageService.findCurrentPage("First page").subscribe(data => {this.page = data; 
      console.log(this.page);});
    
  }

  dragEnd(event: CdkDragEnd, componentId: number | undefined) {
    console.log(event, componentId);
    // this.pie = event.dropPoint;
  }
}
