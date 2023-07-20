import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlFactoryDirective } from './directive/control-factory.directive';

import { GlobalConfigurationComponent } from './custom-component/prepare-component/global-configuration.component';
import { CheckboxConfigurationComponent } from './custom-component/prepare-component/checkbox/checkbox-configuration.component';

import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { CheckboxComponent } from './custom-component/checkbox/checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    DragAndDropComponent,
    ControlFactoryDirective,
    GlobalConfigurationComponent,
    CheckboxConfigurationComponent,
    CheckboxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NgxJsonViewerModule,
    DragDropModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
