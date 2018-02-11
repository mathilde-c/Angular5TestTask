import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule, MatInputModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { DatesFilterComponent } from './components/dates-filter/dates-filter.component';
import { ClearFilterComponent } from './components/clear-filter/clear-filter.component';
import { CategoryAttributeFilterComponent } from './components/category-attribute-filter/category-attribute-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    DatesFilterComponent,
    ClearFilterComponent,
    CategoryAttributeFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
