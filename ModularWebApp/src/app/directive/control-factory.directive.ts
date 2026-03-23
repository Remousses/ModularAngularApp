import {
  Directive,
  OnChanges,
  ViewContainerRef,
  inject,
  input
} from '@angular/core';

import { Attribute } from '../interface/attribute.interface';
import { ComponentTypeConstant } from '../util/constant/component-type.constant';


@Directive({
    selector: '[ctrl-factory]',
    standalone: true
})
export class ControlFactoryDirective implements OnChanges {

    private readonly container = inject(ViewContainerRef);

    readonly componentType = input('');
    readonly attributes = input<Attribute[] | undefined>([]);

    ngOnChanges() {
        const componentType = this.componentType();
        if (!componentType) return;
        if(!ComponentTypeConstant.TYPE_MAP[componentType]) {
            throw new Error(`No class defined in TYPE_MAP for '${componentType}'`);
        }
        
        const compRef = this.container.createComponent(ComponentTypeConstant.TYPE_MAP[componentType]);
        
        const attributes = this.attributes();
        if (attributes) {
            attributes.forEach(attr => {
                switch (attr.type) {
                    case 'Boolean':
                        attr.value = (/true/i).test(attr.value);
                        break;
                    case 'Number':
                        attr.value = Number.parseInt(attr.value);
                        break;
                    case 'Float':
                        attr.value = Number.parseFloat(attr.value);
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
