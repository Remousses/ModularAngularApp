import {
    Directive,
    Input,
    OnChanges,
    ViewContainerRef
} from '@angular/core';

import { Attribute } from '../interface/attribute.interface';

import { CheckboxComponent } from '../custom-component/prepare-component/checkbox/checkbox.component';
import { TableComponent } from '../custom-component/prepare-component/table/table.component';


@Directive({
    selector: '[ctrl-factory]'
})
export class ControlFactoryDirective implements OnChanges {
    private static readonly TYPE_MAP: any = {
        'Checkbox': CheckboxComponent,
        'Table': TableComponent
    };
    @Input() componentType = '';
    @Input() attributes: Attribute[] | undefined = [];

    constructor(
        private container: ViewContainerRef) { }

    ngOnChanges() {
        if (!this.componentType) return;
        if(!ControlFactoryDirective.TYPE_MAP[this.componentType]) {
            throw new Error(`No class defined in TYPE_MAP for '${this.componentType}'`);
        }
        
        const compRef = this.container.createComponent(ControlFactoryDirective.TYPE_MAP[this.componentType]);
        
        if (this.attributes) {
            this.attributes.forEach(attr => {
                switch (attr.type) {
                    case 'Boolean':
                        attr.value = (/true/i).test(attr.value);
                        break;
                    case 'Number':
                        attr.value = parseInt(attr.value);
                        break;
                    case 'Float':
                        attr.value = parseFloat(attr.value);
                        break;
                }
                compRef.setInput(attr.name, attr.value)
            });
        }
    }
}
