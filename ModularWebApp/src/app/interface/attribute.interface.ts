import { CustomComponent } from "./component.interface";

export interface Attribute {
    id?: number;
    name: string;
    value: any;
    type: string;
    customComponent: CustomComponent;
}