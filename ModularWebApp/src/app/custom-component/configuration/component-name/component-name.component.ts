import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-component-name',
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.scss']
})
export class ComponentNameComponent implements OnInit {

  componentNameKeyUp = new Subject<string>();
  @Output() componentNameChange = new EventEmitter<string>();
  componentName = '';
  
  ngOnInit() {
    this.componentNameKeyUp.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(data => this.componentNameChange.emit(data));
  }

  addComponentName(componentName: string) {
    this.componentNameKeyUp.next(componentName);
  }
}
