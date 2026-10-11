import { Component, inject, OnDestroy } from '@angular/core';
import { Page } from '../interface/page.interface';
import { ComponentService } from '../service/component.service';
import { CustomComponent } from '../interface/component.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CdkDrag, CdkDragEnd, CdkDragHandle } from '@angular/cdk/drag-drop';
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
export class DragAndDropComponent implements OnDestroy {
  private readonly componentService = inject(ComponentService);
  private readonly pagesFacade = inject(PagesFacade);
  private readonly destroy$ = new Subject<void>();

  currentPage = this.pagesFacade.currentPage;

  removeComponent(comp: CustomComponent) {
    const result = this.componentService.deleteById(comp);
    if (result) {
      result.pipe(takeUntil(this.destroy$)).subscribe(() => {
        const page = this.pagesFacade.currentPage();
        if (page?.id) {
          this.pagesFacade.deleteCustomComponent(page.id, comp.id);
        }
      });
    }
  }

  dragEnd(
    event: CdkDragEnd,
    page: Page,
    customComponent: CustomComponent,
  ) {
    const dropPoint = event.source.getFreeDragPosition();

    if (customComponent.id) {
      this.componentService
        .savePosition(customComponent.id, dropPoint)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.pagesFacade.upsertCustomComponent(page.id!, data);
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
