import { CustomComponent } from "./component.interface";

export interface Page {
    id?: number;
    title: string;
    components?: CustomComponent[];
}