import { Component, OnInit } from '@angular/core';
import { PageService } from './service/page.service';
import { Page } from './interface/page.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pages: Page[] = []
  
  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.pages = this.pageService.getLoadedPages();
  }
}
