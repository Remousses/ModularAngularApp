import { Component, OnInit, output } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-component-name',
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.scss'],
  imports: [MatFormField, MatLabel, MatInput, FormsModule],
  standalone: true,
})
export class ComponentNameComponent implements OnInit {
  componentNameKeyUp = new Subject<string>();
  componentName = '';
  readonly componentNameChange = output<string>();

  ngOnInit() {
    this.componentNameKeyUp
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((data) => this.componentNameChange.emit(data));
  }

  addComponentName(componentName: string) {
    this.componentNameKeyUp.next(componentName);
  }
}
