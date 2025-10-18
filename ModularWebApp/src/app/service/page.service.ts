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
  
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  private pages!: any;

  findCurrentPage(title:  string): Observable<Page> {
    return this.http.get<Page>(UrlConstant.pageUrl + title);
  }

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

  getCurrentPage(): Page {
    return this.pages.find((page: Page) => page.url === this.router.url.substring(1));
  }

  updateSessionPageCustomComponents(page: Page, customComponent: CustomComponent): Page {
    for (const p of this.pages) {
      if (p.id === page.id) {
        for (let j = 0; j < p.customComponents?.length; j++) {
          if (p.customComponents[j].id === customComponent.id) {
            p.customComponents[j] = customComponent;
            break;
          }
        }
      }
    }

    this.updateSessionPages();
    return page;
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
