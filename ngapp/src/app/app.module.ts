import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { DialogsampleComponent } from './dialogsample/dialogsample.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    DialogsampleComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatButtonModule, MatCheckboxModule,MatFormFieldModule,MatInputModule,MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogsampleComponent]
})
export class AppModule { }
