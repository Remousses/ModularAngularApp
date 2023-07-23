import { Attribute } from "./attribute.interface";
import { Page } from "./page.interface";

export interface CustomComponent {
    id?: number;
    name: string;
    type: string;
    attributes?: Attribute[];
    dropPoint?: any;
    page: Page;
}