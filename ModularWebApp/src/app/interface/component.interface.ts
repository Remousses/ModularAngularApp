import { Attribute } from "./attribute.interface";

export interface Component {
    id: number;
    name: string;
    attributes?: Attribute[];
    dropPoint?: any;
}