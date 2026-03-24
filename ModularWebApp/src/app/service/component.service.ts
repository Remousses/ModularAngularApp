import { Injectable, inject } from "@angular/core";
import { CustomComponent } from "../interface/component.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UrlConstant } from "../util/constant/url.constant";
import { Attribute } from "../interface/attribute.interface";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PagesFacade } from "../+state/pages.facade";

@Injectable({
    providedIn: 'root'
})
export class ComponentService {

    private readonly http = inject(HttpClient);
    private readonly pagesFacade = inject(PagesFacade);
    private readonly snackBar = inject(MatSnackBar);

    save(customComponent: CustomComponent): Observable<CustomComponent> {
        const clone = structuredClone(customComponent);
        this.avoidCircularError(clone);
        return this.http.post<CustomComponent>(UrlConstant.componentUrl, clone);
    }

    add(componentName: string, componentType: string, attributes: Attribute[]) {
        if (!componentName) {
            return;
        }
        const page = this.pagesFacade.currentPage();

        if (page?.id) {
            const customComponent: CustomComponent = {
                name: componentName,
                type: componentType,
                page,
                attributes
            };
            this.avoidCircularError(customComponent);
            const clone = structuredClone(customComponent);
            this.http.post<CustomComponent>(UrlConstant.componentUrl + 'add/' + customComponent.page.id, clone)
                .subscribe(data => this.pagesFacade.upsertCustomComponent(page.id!, data));
        } else {
            this.snackBar.open('Current page not stored in database', 'Close', { duration: 4000 });
        }
    }

    savePosition(id: number, dropPoint: any): Observable<CustomComponent> {
        return this.http.post<CustomComponent>(UrlConstant.componentUrl + id, dropPoint);
    }

    private avoidCircularError(customComponent: CustomComponent) {
        customComponent.page.customComponents = [];
    }

    deleteById(comp: CustomComponent) {
        if (!comp) {
            return;
        }

        const page = this.pagesFacade.currentPage();

        if (page?.id) {
            this.http.delete<void>(UrlConstant.componentUrl + comp.id)
                .subscribe(_ => this.pagesFacade.deleteCustomComponent(page.id!, comp.id));
        } else {
            this.snackBar.open('Current page not stored in database', 'Close', { duration: 4000 });
        }
    }
}
