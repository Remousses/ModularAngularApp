import { Injectable } from "@angular/core";
import { CustomComponent } from "../interface/component.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UrlConstant } from "../util/constant/UrlConstant";

@Injectable({
    providedIn: 'root'
})
export class ComponentService {

    constructor(private http: HttpClient) {}

    getComponent() {
        return null;
    }

    save(customComponent: CustomComponent): Observable<CustomComponent> {
        const clone = structuredClone(customComponent);
        this.avoidCircularError(clone);
        return this.http.post<CustomComponent>(UrlConstant.componentUrl, clone);
    }

    savePosition(id: Number, dropPoint: any): Observable<CustomComponent> {
        return this.http.post<CustomComponent>(UrlConstant.componentUrl + id, dropPoint);
    }

    private avoidCircularError(customComponent: CustomComponent) {
        customComponent.page.customComponents = [];
    }
}
