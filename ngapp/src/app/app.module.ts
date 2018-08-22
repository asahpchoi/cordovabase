import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { DialogsampleComponent } from './misc/dialogsample/dialogsample.component';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartComponent } from './chartSection/chart.component';
import { PeService } from './pe.service';
import { InputComponent } from './inputSection/input.component';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule, MatChip } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationResultComponent } from './validationSection/validation-result.component';
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from './misc/slider/slider.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { HammerCardComponent } from './misc/hammer-card/hammer-card.component';

import { MatCardModule } from '@angular/material';
import { FundsComponent } from './misc/funds/funds.component';
import { DonutchartComponent } from './misc/donutchart/donutchart.component';
import { MatGridListModule } from '@angular/material/grid-list';

import { OccupationComponent } from './misc/occupation/occupation.component';
import { OccupationSearchComponent } from './misc/occupation-search/occupation-search.component';
import { SearchTextPipe } from './misc/search-text.pipe';
import { TableComponent } from './tableSection/table.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NumpadComponent } from './components/numpad/numpad.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { AddRiderComponent } from './components/add-rider/add-rider.component';
import { AddRidersComponent } from './addRiderSection/add-riders.component';
import { UserService } from './user.service';
import { UlinputComponent } from './ulinput/ulinput.component';
import { CompareChartsComponent } from './compare-charts/compare-charts.component';
import { ReportChartComponent } from './report-chart/report-chart.component';
import { FundactivityComponent } from './fundactivity/fundactivity.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { MatListModule } from '@angular/material/list';
import { ProposalReducer } from './stores/proposal-reducer'
import { StoreModule } from '@ngrx/store';
import { DonutchartPoCComponent } from './donutchart-po-c/donutchart-po-c.component';
import { FundallocationComponent } from './fundallocation/fundallocation.component';
import { DrawingComponent } from './drawing/drawing.component';
import { VoiceComponent } from './voice/voice.component';
import { ConfigService } from './config.service';
import { FundhistoryComponent } from './fundhistory/fundhistory.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { NextComponent } from './next/next.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule } from '@angular/material';
import { NextDirective } from './next.directive';
import { LottieComponent } from './lottie/lottie.component';
import { LottieAnimationViewModule } from 'ng-lottie';
import { ScrollamaComponent } from './scrollama/scrollama.component';
import { SelectionComponent } from './selection/selection.component';
import { SelectiondemoComponent } from './selectiondemo/selectiondemo.component';
import { DataService } from './data.service';


const appRoutes: Routes = [
  { path: 'slider', component: SliderComponent },
  { path: 'funds', component: FundsComponent },
  { path: 'occupation', component: OccupationComponent },
  { path: 'compareChart', component: CompareChartsComponent },
  { path: 'reportChart', component: ReportChartComponent },
  { path: 'userlist', component: CustomerListComponent },
  { path: 'Fundallocation', component: FundallocationComponent },
  { path: 'draw', component: DrawingComponent },
  { path: 'autocomplete', component: SelectiondemoComponent },
  { path: 'input', component: InputComponent },
  { path: 'next', component: NextComponent },
  { path: 'lottie', component: LottieComponent },
  { path: 'selectionDemo', component: SelectiondemoComponent },
  { path: '', component: SelectiondemoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DialogsampleComponent,
    ChartComponent,
    InputComponent,
    ValidationResultComponent,
    SliderComponent,

    HammerCardComponent,
    FundsComponent,
    DonutchartComponent,
    OccupationComponent,
    OccupationSearchComponent,
    SearchTextPipe,
    TableComponent,
    NumpadComponent,
    AddRiderComponent,
    AddRidersComponent,
    UlinputComponent,
    CompareChartsComponent,
    ReportChartComponent,
    FundactivityComponent,
    CustomerListComponent,
    DonutchartPoCComponent,
    FundallocationComponent,
    DrawingComponent,
    VoiceComponent,
    FundhistoryComponent,
    AutocompleteComponent,
    NextComponent,
    NextDirective,
    LottieComponent,
    ScrollamaComponent,
    SelectionComponent,
    SelectiondemoComponent,


  ],
  imports: [
    BrowserModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatGridListModule,
    HttpClientModule,
    FlexLayoutModule,
    MatChipsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDialogModule,
    FormsModule, ReactiveFormsModule, MatSidenavModule,
    MatSliderModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LottieAnimationViewModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),

  ],
  providers: [PeService, UserService, ConfigService, DataService],
  bootstrap: [AppComponent],
  entryComponents: [SelectionComponent, FundhistoryComponent, DialogsampleComponent, NumpadComponent, AddRiderComponent, UlinputComponent, FundactivityComponent, DonutchartComponent]
})
export class AppModule { }
