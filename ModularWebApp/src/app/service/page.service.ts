import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UrlConstant } from "../util/constant/url.constant";
import { Page } from "../interface/page.interface";

@Injectable({
  providedIn: 'root'
})
export class PageService {
  
  private readonly http = inject(HttpClient);

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(UrlConstant.pageUrl);
  }

  save(page:  Page): Observable<Page> {
    return this.http.post<Page>(UrlConstant.pageUrl, page);
  }
}
