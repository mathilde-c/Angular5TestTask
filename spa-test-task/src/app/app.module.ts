import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule, MatInputModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatTooltipModule } from '@angular/material';
import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { DatesFilterComponent } from './components/dates-filter/dates-filter.component';
import { ClearFilterComponent } from './components/clear-filter/clear-filter.component';
import { CategoryAttributeFilterComponent } from './components/category-attribute-filter/category-attribute-filter.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { FiltersComponent } from './components/filters/filters.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { FilterService } from './services/filter.service';
import { HeaderInterceptor } from './services/header-interceptor.service';
import { BaseUriInterceptor } from './services/base-uri-interceptor.service';

import { AttributesFilterContainerDirective } from './tools/attributes-filter-container.directive';


@NgModule({
  declarations: [
    AppComponent,
    DatesFilterComponent,
    ClearFilterComponent,
    CategoryAttributeFilterComponent,
    CategoryFilterComponent,
    AttributesFilterContainerDirective,
    FiltersComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: BaseUriInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    UserService,
    CategoryService,
    FilterService
  ],
  entryComponents: [CategoryAttributeFilterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
