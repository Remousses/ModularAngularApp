import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { UrlConstant } from "../util/constant/url.constant";
import { Page } from "../interface/page.interface";
import { CustomComponent } from "../interface/component.interface";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PageService {
  
  private readonly http = inject(HttpClient);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  private pages!: Page[];

  findCurrentPage(title:  string): Observable<Page> {
    return this.http.get<Page>(UrlConstant.pageUrl + title);
  }

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(UrlConstant.pageUrl);
  }

  getLoadedPages(): Page[] {
    const pages = sessionStorage.getItem('pages');
    if (!pages) {
      return [];
    }

    this.pages = JSON.parse(pages) as Page[]

    return this.pages;
  }

  setLoadedPages(pages: Page[]) {
    sessionStorage.setItem('pages', JSON.stringify(pages));
  }

  clearLoadedPages() {
    sessionStorage.removeItem('pages');
  }

  getCurrentPage(): Page | undefined {
    return this.pages.find((page: Page) => page.url === this.router.url.substring(1));
  }

  deleteSessionPageCustomComponents(pageId: number, customComponent: CustomComponent): void {
    const page = this.pages[this.pages.findIndex(p => p.id === pageId)];
    if (!page) {
      return;
    }
    page.customComponents = page.customComponents?.filter(c => c.id !== customComponent.id);
    this.updateSessionPages();
  }

  addSessionPageCustomComponents(pageId: number, customComponent: CustomComponent): void {
    const page = this.pages[this.pages.findIndex(p => p.id === pageId)];
    if (!page) {
      return;
    }
    const compIndex = page.customComponents?.findIndex(c => c.id === customComponent.id);
    
    if (compIndex !== -1 && compIndex !== undefined) {
      page.customComponents![compIndex] = customComponent;
    } else {
      page.customComponents!.push(customComponent);
    }

    this.updateSessionPages();
  }

  updateSessionPages() {
    this.setLoadedPages(this.pages);
  }

  save(page:  Page): void {
    this.http.post<Page>(UrlConstant.pageUrl, page).subscribe({
      next: (data) => {
        this.pages.push(data);
        this.updateSessionPages();
        this.toastr.success('The ' + data.title + 'page has been successfully created!');
      },
      error: (err) => this.toastr.error(err.error.error, 'Your page has not been created!')
    });
  }
}
