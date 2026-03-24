import { Component, inject } from '@angular/core';
import { Page } from '../interface/page.interface';
import { ComponentService } from '../service/component.service';
import { CustomComponent } from '../interface/component.interface';

import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ControlFactoryDirective } from '../directive/control-factory.directive';
import { PagesFacade } from '../+state/pages.facade';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
  imports: [
    CdkDrag,
    CdkDragHandle,
    MatButtonModule,
    MatIconModule,
    ControlFactoryDirective
  ],
  standalone: true,
})
export class DragAndDropComponent {
  private readonly XY_REGEX = /(\d+)px/g;
  private readonly componentService = inject(ComponentService);
  private readonly pagesFacade = inject(PagesFacade);

  currentPage = this.pagesFacade.currentPage;

  removeComponent(comp: CustomComponent) {
    this.componentService.deleteById(comp);
  }

  dragEnd(
    event: any,
    page: Page,
    customComponent: CustomComponent,
    div: HTMLDivElement,
  ) {
    const dropPoint = this.retrieveXY(div.style.transform);

    if (customComponent.id) {
      this.componentService
        .savePosition(customComponent.id, dropPoint)
        .subscribe((data) => {
          this.pagesFacade.upsertCustomComponent(page.id!, data);
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
      y: matches[1],
    };
  }
}
