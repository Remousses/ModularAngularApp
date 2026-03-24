import { inject, Injectable } from '@angular/core';
import { PagesStore } from './pages.store';
import { CustomComponent } from '../interface/component.interface';
import { Page } from '../interface/page.interface';

@Injectable({ providedIn: 'root' })
export class PagesFacade {
  private readonly store = inject(PagesStore);

  readonly pages = this.store.pages;
  readonly isLoading = this.store.isLoading;
  readonly currentPage = this.store.currentPage;

  loadAllPages(): void {
    this.store.fetchPages(); 
  }

  savePage(page: Page) {
    this.store.savePage(page);
  }

  upsertCustomComponent(pageId: number, component: CustomComponent): void {
    this.store.upsertComponent(pageId, component);
  }

  deleteCustomComponent(pageId: number, componentId: number | undefined): void {
    if (!componentId) {
      return;
    }
    this.store.deleteComponent(pageId, componentId);
  }

  setPages(pages: Page[]) {
    this.store.setPages(pages);
  }
}