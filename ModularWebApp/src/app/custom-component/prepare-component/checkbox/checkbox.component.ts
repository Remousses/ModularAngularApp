import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KnowOurDatasAbstract } from 'src/app/abstract/KnowOurDatas.abstract';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends KnowOurDatasAbstract implements OnInit {
  @Input({ required: true }) checked = false;
  @Input({ required: true }) indeterminate = false;

  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() indeterminateChange = new EventEmitter<boolean>();

  ngOnInit() {
    this.load(this);
  }
}
