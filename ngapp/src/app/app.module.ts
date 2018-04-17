import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { InputchartComponent } from './inputchart/inputchart.component';
import {MatSliderModule} from '@angular/material/slider';
import { HammerCardComponent } from './hammer-card/hammer-card.component';
import { HammertimeDirective } from './hammertime.directive';
import { MatCardModule } from '@angular/material';
import { FundsComponent } from './funds/funds.component';

const appRoutes: Routes = [
 { path: 'slider', component: SliderComponent },
 { path: 'funds', component: FundsComponent },
 { path: '', component: InputchartComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    DialogsampleComponent,
    ChartComponent,
    InputComponent,
    ValidationResultComponent,
    SliderComponent,
    InputchartComponent,
    HammerCardComponent,
    HammertimeDirective,
    FundsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,
    FlexLayoutModule,

    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDialogModule,
    FormsModule, ReactiveFormsModule,
    MatSliderModule,
    MatCardModule,

    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [PeService],
  bootstrap: [AppComponent],
  entryComponents: [DialogsampleComponent]
})
export class AppModule { }
