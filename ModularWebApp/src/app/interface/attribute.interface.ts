import { CustomComponent } from "./component.interface";

export interface Attribute {
    id?: number;
    name: string;
    type: string;
    value: any;
    customComponent?: CustomComponent;
}