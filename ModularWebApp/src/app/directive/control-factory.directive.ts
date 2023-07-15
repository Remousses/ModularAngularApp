import {
    Directive,
    Input,
    OnChanges,
    ViewContainerRef
} from '@angular/core';

import { CheckboxComponent } from '../custom-component/checkbox/checkbox.component';
import { Attribute } from '../interface/attribute.interface';


@Directive({
    selector: '[ctrl-factory]'
})
export class ControlFactoryDirective implements OnChanges {
    static readonly TYPE_MAP: any = {
        "checkbox": CheckboxComponent
    };
    @Input() componentName = '';
    @Input() attributes: Attribute[] | undefined = [];

    constructor(
        private container: ViewContainerRef) { }

    ngOnChanges() {
        console.log("directive");
        
        if (!this.componentName) return;

        if(!ControlFactoryDirective.TYPE_MAP[this.componentName]) {
            throw new Error(`No class defined in TYPE_MAP for '${this.componentName}'`);
        }
        
        const compRef = this.container.createComponent(ControlFactoryDirective.TYPE_MAP[this.componentName]);
        
        if (this.attributes) {
            this.attributes.forEach(attr => compRef.setInput(attr.name, attr.value));
        }
    }
}
