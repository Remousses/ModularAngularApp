import { Component } from "./component.interface";

export interface Page {
    id?: number;
    title: string;
    components?: Component[];
}