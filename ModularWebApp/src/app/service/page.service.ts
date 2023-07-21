import { Injectable } from "@angular/core";
import { Page } from "../interface/page.interface";
import { HttpClient } from "@angular/common/http";
import { UrlConstant } from "../util/constant/UrlConstant";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PageService {
  pages = new Set<Page>;
  currentPage!: Page;

  constructor(private http: HttpClient) {}

  findCurrentPage(title:  string): Observable<Page> { 
    return this.http.get<Page>(UrlConstant.pageUrl + title); 
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(UrlConstant.pageUrl); 
  }
}