import { Injectable } from "@angular/core";
import { CustomComponent } from "../interface/component.interface";

@Injectable({
    providedIn: 'root'
})
export class ComponentService {

    getComponent() {
        return null;
    }

    addComponent(pageId: number, component: CustomComponent) {

    }
}