import { Injectable, inject } from "@angular/core";
import { CustomComponent } from "../interface/component.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UrlConstant } from "../util/constant/UrlConstant";
import { PageService } from "./page.service";
import { Attribute } from "../interface/attribute.interface";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class ComponentService {

    private http = inject(HttpClient);
    private pageService = inject(PageService);
    private snackBar = inject(MatSnackBar);

    getComponent() {
        return null;
    }

    save(customComponent: CustomComponent): Observable<CustomComponent> {
        const clone = structuredClone(customComponent);
        this.avoidCircularError(clone);
        return this.http.post<CustomComponent>(UrlConstant.componentUrl, clone);
    }

    add(componentName: string, componentType: string, attributes: Attribute[]) {
        if (componentName) {
            const page = this.pageService.getCurrentPage();
            
            if (page && page.id) {
                const customComponent: CustomComponent = {
                    name: componentName,
                    type: componentType,
                    page,
                    attributes
                };
                this.avoidCircularError(customComponent);
                const clone = structuredClone(customComponent);
                this.http.post<CustomComponent>(UrlConstant.componentUrl + 'add/' + customComponent.page.id, clone)
                    .subscribe(data => this.pageService.updateSessionPageCustomComponents(page, data));
            } else {
                this.snackBar.open('Current page not stored in database', 'Close', { duration: 4000 });
            }
        }
    }

    savePosition(id: Number, dropPoint: any): Observable<CustomComponent> {
        return this.http.post<CustomComponent>(UrlConstant.componentUrl + id, dropPoint);
    }

    private avoidCircularError(customComponent: CustomComponent) {
        customComponent.page.customComponents = [];
    }
}
