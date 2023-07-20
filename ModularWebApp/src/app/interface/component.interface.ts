import { Attribute } from "./attribute.interface";

export interface CustomComponent {
    id?: number;
    name: string;
    attributes?: Attribute[];
    dropPoint?: any;
}