import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { DialogsampleComponent } from './dialogsample/dialogsample.component';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartComponent } from './chart/chart.component';
import { PeService } from './pe.service';
import { InputComponent } from './input/input.component';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationResultComponent } from './validation-result/validation-result.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogsampleComponent,
    ChartComponent,
    InputComponent,
    ValidationResultComponent
  ],
  imports: [
    HttpClientModule,
 FlexLayoutModule,
    BrowserModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDialogModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [PeService],
  bootstrap: [AppComponent],
  entryComponents: [DialogsampleComponent]
})
export class AppModule { }
