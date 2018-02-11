import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { DatesFilterComponent } from './components/dates-filter/dates-filter.component';
import { ClearFilterComponent } from './components/clear-filter/clear-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    DatesFilterComponent,
    ClearFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
