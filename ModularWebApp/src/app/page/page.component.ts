import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageService } from '../service/page.service';
import { Page } from '../interface/page.interface';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  
  private pageService = inject(PageService);
  pageForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: Validators.required }),
    url: new FormControl('', { nonNullable: true, validators: Validators.required })
  });


  savePage() {
    if (this.pageForm.valid) {
      const page: Page = {
        title: this.pageForm.getRawValue().title,
        url: this.pageForm.getRawValue().url
      };
      this.pageService.save(page);
    }
  }
}
