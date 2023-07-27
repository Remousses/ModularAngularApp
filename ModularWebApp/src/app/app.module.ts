import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule, provideToastr } from 'ngx-toastr';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlFactoryDirective } from './directive/control-factory.directive';

import { GlobalConfigurationComponent } from './custom-component/configuration/global-configuration.component';
import { CheckboxConfigurationComponent } from './custom-component/configuration/checkbox/checkbox-configuration.component';
import { TableConfigurationComponent } from './custom-component/configuration/table/table-configuration.component';

import { CheckboxComponent } from './custom-component/prepare-component/checkbox/checkbox.component';
import { TableComponent } from './custom-component/prepare-component/table/table.component';

import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlFactoryDirective,
    GlobalConfigurationComponent,
    CheckboxConfigurationComponent,
    TableConfigurationComponent,
    DragAndDropComponent,
    PageComponent,
    CheckboxComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxJsonViewerModule,
    HttpClientModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatTableModule
  ],
  providers: [
    provideAnimations(),
    provideToastr()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
