import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationResultComponent } from './validation-result/validation-result.component';
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { InputchartComponent } from './inputchart/inputchart.component';
import { MatSliderModule } from '@angular/material/slider';
import { HammerCardComponent } from './hammer-card/hammer-card.component';
import { HammertimeDirective } from './hammertime.directive';
import { MatCardModule } from '@angular/material';
import { FundsComponent } from './funds/funds.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DonutchartComponent } from './donutchart/donutchart.component';
import { OccupationComponent } from './occupation/occupation.component';
import { OccupationSearchComponent } from './occupation-search/occupation-search.component';
import { SearchTextPipe } from './search-text.pipe';
import { TableComponent } from './table/table.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NumpadComponent } from './numpad/numpad.component';
 
import { MatExpansionModule } from '@angular/material/expansion';
import { AddRiderComponent } from './add-rider/add-rider.component';
import { AddRidersComponent } from './add-riders/add-riders.component';
import { UserService } from './user.service';

const appRoutes: Routes = [
  { path: 'slider', component: SliderComponent },
  { path: 'funds', component: FundsComponent },
  { path: 'occupation', component: OccupationComponent },
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
    FundsComponent,
    DonutchartComponent,
    OccupationComponent,
    OccupationSearchComponent,
    SearchTextPipe,
    TableComponent,
    NumpadComponent,
    AddRiderComponent,
    AddRidersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatGridListModule,
    HttpClientModule,
    FlexLayoutModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDialogModule,
    FormsModule, ReactiveFormsModule,
    MatSliderModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatExpansionModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [PeService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [DialogsampleComponent, NumpadComponent, AddRiderComponent]
})
export class AppModule { }
