import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UrlConstant } from "../util/constant/url.constant";

@Injectable({
    providedIn: 'root'
  })
export class QueryBuilderService {
    
    private http = inject(HttpClient);

    getFromCustomQuery<D>(url: string, columns: string[]): Observable<D[]> {
        return this.http.post<D[]>(url, columns);
    }
}