import { Injectable } from "@angular/core";
import { Page } from "../interface/page.interface";
import { HttpClient } from "@angular/common/http";
import { UrlConstant } from "../util/constant/UrlConstant";
import { Observable } from "rxjs";
import { CustomComponent } from "../interface/component.interface";

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private currentPage!: Page;
  private pages!: any;

  constructor(private http: HttpClient) {}

  findCurrentPage(title:  string): Observable<Page> {
    return this.http.get<Page>(UrlConstant.pageUrl + title);
  }

  // findCurrentPage(title:  string) {
  //   this.http.get<Page>(UrlConstant.pageUrl + title).subscribe(data => this.currentPage);
  // }

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(UrlConstant.pageUrl);
  }

  getLoadedPages(): Page[] {
    this.pages = sessionStorage.getItem('pages');
    if (!this.pages) {
      return [];
    }

    this.pages = JSON.parse(this.pages) as Page[]

    return this.pages;
  }

  setLoadedPages(pages: Page[]) {
    sessionStorage.setItem('pages', JSON.stringify(pages));
  }

  clearLoadedPages() {
    sessionStorage.removeItem('pages');
  }

  getCurrentPage() {
    return this.currentPage;
  }

  updateSessionPageCustomComponents(page: Page, customComponent: CustomComponent) {
    for (let i = 0; i < this.pages.length; i++) {
      if (this.pages[i].id === page.id) {
        for (let j = 0; j < this.pages[i].customComponents?.length; j++) {
          if (this.pages[i].customComponents[j].id === customComponent.id) {
            this.pages[i].customComponents[j] = customComponent;
            break;
          }
        }
      }
    }

    this.clearLoadedPages();
    this.setLoadedPages(this.pages);
    return page;
  }
}
