import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ComponentRef, ElementRef, Renderer2, ViewContainerRef } from '@angular/core';
import { CheckboxComponent } from '../custom-component/checkbox/checkbox.component';
import { Page } from '../interface/page.interface';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent {
  static readonly TYPE_MAP: any = {
    "checkbox": CheckboxComponent
  };
  appContent = ['Carrots', 'Tomatoes', 'Onions', 'Apples', 'Avocados'];

  basket = ['Oranges', 'Bananas', 'Cucumbers'];

  pie: any;

  pages: Page[] = [];
  page: Page = {
    title: 'test1',
    components: [{
      id: 1,
      name: 'checkbox',
      attributes: [{
        name: 'checked',
        value: true
      }],
      dropPoint: {x: 20, y: 50}
    }, {
      id: 2,
      name: 'checkbox',
      attributes: [{
        name: 'indeterminate',
        value: true
      }]
    }]
  };
  componentRef!: ComponentRef<DragAndDropComponent> ;

  constructor(private container: ViewContainerRef, private ref: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // let myStorage = window.localStorage;
    // let t = myStorage.getItem("pie");
    // if (!t) {
    //   t = "";
    // }
    // this.pie= JSON.parse(t);
    // console.log(this.pie);
    // this.loadComponents();
  }

  dragEnd(event: CdkDragEnd, componentId: number) {
    console.log(event);
    let myStorage = window.localStorage;
    // this.pie = event.dropPoint;
    myStorage.setItem("pie", JSON.stringify(event.dropPoint));
  }

  save() {

  }

  private loadComponents() {
    // this.pages = [{
    //   title: 'test1',
    //   components: [{
    //     name: 'checkbox',
    //     // attributes: ''
    //   }, {
    //     name: 'checkbox',
    //     // attributes: ''
    //   }]
    // }];

//     // this.pages.forEach(page => {
//     page.components.forEach(component => {

//         if(!DragAndDropComponent.TYPE_MAP[component.name]) {
//             throw new Error(`No class defined in TYPE_MAP for '${component.name}'`);
//         }

//         // var factories = Array.from(this.resolver['_factories'].keys());
//         // var factoryClass = factories.find((x: any) => x.name === this.comp);
//         // const factory = this.resolver.resolveComponentFactory(factoryClass);
//         console.log(DragAndDropComponent.TYPE_MAP[component.name]);
        
//         const card = this.renderer.createElement('div');
//         const text = this.renderer.createText('Hello world!');
//         console.log(card);
        
//         // card.setAttribute('cdkDrag', '');
//         this.renderer.appendChild(card, text);
//         // card.location.nativeElement.setAttributes('cdkDrag', '');
//         // const dragDrop: ComponentRef<DragDrop> = this.container.createComponent(DragDrop);
//         // dragDrop.componentType.createDrag();
//         const compRef = this.container.createComponent(DragAndDropComponent.TYPE_MAP[component.name])
// console.log('card', card);

// // card.location.nativeElement.appendChild(compRef.location.nativeElement);
// card.appendChild(compRef.location.nativeElement);
//         // this.ref.nativeElement.appendChild(card.location.nativeElement);
//         this.ref.nativeElement.appendChild(card);
//         // compRef.setInput('cdkDrag', '');
//         // card.location.nativeElement.appendChild(compRef);


//         // console.log(card);
//         console.log(compRef);

//         // cdkDrag (cdkDragEnded)="dragEnd($event, 'test3')"
//     });
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   console.log(event);
    
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }
}
