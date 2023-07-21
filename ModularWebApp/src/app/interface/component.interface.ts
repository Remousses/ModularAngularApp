import { Attribute } from "./attribute.interface";

export interface CustomComponent {
    id?: number;
    name: string;
    type: string;
    attributes?: Attribute[];
    dropPoint?: any;
}