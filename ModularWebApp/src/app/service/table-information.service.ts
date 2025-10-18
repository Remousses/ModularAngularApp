import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { UrlConstant } from "../util/constant/url.constant";

@Injectable({
    providedIn: 'root'
})
export class TableInformationService {

    private http = inject(HttpClient);

    get(): Observable<Map<string, string[]>> {
        return this.http.get<Map<string, string[]>>(UrlConstant.tableInformation);
    }
}