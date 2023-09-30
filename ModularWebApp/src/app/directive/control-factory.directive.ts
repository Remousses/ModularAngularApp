import {
    Directive,
    Input,
    OnChanges,
    ViewContainerRef,
    inject
} from '@angular/core';

import { Attribute } from '../interface/attribute.interface';

import { ComponentType } from '../util/constant/ComponentType';


@Directive({
    selector: '[ctrl-factory]'
})
export class ControlFactoryDirective implements OnChanges {

    private container = inject(ViewContainerRef);

    @Input() componentType = '';
    @Input() attributes: Attribute[] | undefined = [];

    ngOnChanges() {
        if (!this.componentType) return;
        if(!ComponentType.TYPE_MAP[this.componentType]) {
            throw new Error(`No class defined in TYPE_MAP for '${this.componentType}'`);
        }
        
        const compRef = this.container.createComponent(ComponentType.TYPE_MAP[this.componentType]);
        
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
                    case 'Array':
                        attr.value = JSON.parse(attr.value);
                        break;
                }
                compRef.setInput(attr.name, attr.value)
            });
        }
    }
}
