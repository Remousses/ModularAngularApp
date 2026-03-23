import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class QueryBuilderService {
    
    private readonly http = inject(HttpClient);

    getFromCustomQuery<D>(url: string, columns: string[]): Observable<D[]> {
        return this.http.post<D[]>(url, columns);
    }
}