import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Page } from '../interface/page.interface';
import { MatFormField, MatLabel, MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { PagesFacade } from '../+state/pages.facade';

@Component({
    selector: 'app-page',
    templateUrl: './create-page.component.html',
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatButton],
    standalone: true
})
export class CreatePageComponent {
  
  private readonly pagesFacade = inject(PagesFacade);
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
      this.pagesFacade.savePage(page);
    }
  }
}
