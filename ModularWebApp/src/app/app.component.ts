import { Component, OnInit, inject } from '@angular/core';
import { PageService } from './service/page.service';
import { Page } from './interface/page.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private pageService = inject(PageService);
  pages: Page[] = []
  

  ngOnInit() {
    this.pages = this.pageService.getLoadedPages();
  }
}
