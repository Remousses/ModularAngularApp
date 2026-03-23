import { Component, OnInit } from '@angular/core';
import { KnowOurDatasAbstract } from 'src/app/abstract/KnowOurDatas.abstract';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule],
  standalone: true,
})
export class HomeComponent extends KnowOurDatasAbstract implements OnInit {
  ngOnInit() {
    this.load(this);
  }
}
