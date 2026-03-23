import { Component, OnInit, model } from '@angular/core';
import { KnowOurDatasAbstract } from 'src/app/abstract/KnowOurDatas.abstract';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  imports: [MatCard, MatCardContent, MatCheckbox, FormsModule],
  standalone: true,
})
export class CheckboxComponent extends KnowOurDatasAbstract implements OnInit {
  readonly checked = model<boolean>(false);
  readonly indeterminate = model<boolean>(false);

  ngOnInit() {
    this.load(this);
  }
}
