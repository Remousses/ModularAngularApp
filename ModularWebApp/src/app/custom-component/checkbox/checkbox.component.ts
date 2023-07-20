import { Component, OnInit, Input } from '@angular/core';
import { KnowOurDatasAbstract } from 'src/app/abstract/KnowOurDatas.abstract';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends KnowOurDatasAbstract implements OnInit {
  @Input() checked = false;
  @Input() indeterminate = false;

  ngOnInit() {
    this.load(this);
  }
}
