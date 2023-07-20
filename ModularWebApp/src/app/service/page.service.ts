import { Injectable } from "@angular/core";
import { Page } from "../interface/page.interface";

@Injectable({
    providedIn: 'root'
})
export class PageService {
    pages = new Set<Page>;
    currentPage!: Page;

    findCurrentPage() {
        this.currentPage = {
          id: 1,
            title: 'test1',
            components: [{
              id: 1,
              name: 'checkbox',
              attributes: [{
                name: 'checked',
                type: 'Boolean',
                value: 'true'
              }],
              // dropPoint: {x: 20, y: 50}
            // }, {
            //   id: 2,
            //   name: 'checkbox',
            //   attributes: [{
            //     name: 'indeterminate',
                // type: 'Boolean',
            //     value: 'true'
            //   }]
            // }, {
            //   id: 3,
            //   name: 'checkbox',
            //   attributes: [{
            //     name: 'indeterminate',
            //     value: true
            //   }]
            }]
          };
    }

    getCurrentPage() {
        return this.currentPage;
    }

    getPages() {

    }
}