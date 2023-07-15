import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { ControlFactoryDirective } from './directive/control-factory.directive';
import { CheckboxComponent } from './custom-component/checkbox/checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    DragAndDropComponent,
    ControlFactoryDirective,
    CheckboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    DragDropModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
