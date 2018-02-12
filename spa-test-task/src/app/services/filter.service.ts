import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserService } from './user.service';
import { Category } from '../models/category';
import { SelectedAttribute } from '../models/selected-attribute';
import { CompletedAuditSearchResult } from '../models/completed-audit-search-result';
import { DatesFilter } from '../models/dates-filter';
import { ApiCallService } from './api-call.service';

@Injectable()
export class FilterService {

    private currentCategoryId: number = null;
    private selectedAttributes: Array<SelectedAttribute> = [];
    private datesFilter: DatesFilter = null;

    constructor(private http: HttpClient,
        private apiService: ApiCallService,
    private userService: UserService) { }

    public searchCompletedAudits(stopSearch: Subject<boolean>): Observable<Array<CompletedAuditSearchResult>> {

        if (this.currentCategoryId != null){
            // call AuditScores on Category
        } else {
            // call CategoryAuditScores
            return this.AuditOnAllCategories(stopSearch);
        }
        //api call takeUntil(stopWatch)
        let dummyResults: Array<CompletedAuditSearchResult> = [];

        let dummy: CompletedAuditSearchResult = new CompletedAuditSearchResult();
        dummy.CategoryName = "dummyResult";
        dummy.CategoryId = 1;
        dummy.CompletedAuditCount = 2;
        dummy.FailedAuditCount = 0;
        dummyResults.push(dummy)
        dummy.CategoryName = "dummyResult2";
        dummy.CategoryId = 2;
        dummy.CompletedAuditCount = 5;
        dummy.FailedAuditCount = 7;
        dummyResults.push(dummy)

        return Observable.of(dummyResults);
    }

    private AuditOnAllCategories(arg0: any): any {
        const httpOptions = {
            headers: new HttpHeaders({
              "Content-Type":  "application/json",
              "Accept": "application/json"
            })};
    
            let body: any = {
                "userId": 28,
                "categoryId": 0,
                "loadAttributes": true
              };
    
        return  this.apiService.makePostCall<Category[]>("Category", body);
        //return this.http.post<Category[]>("http://incontrolpty.australiaeast.cloudapp.azure.com:7123/WebServices/api/" + "Category", body, httpOptions);
    }

    public setCategory(newCategory: Category): void {
        this.currentCategoryId = newCategory.CategoryId;
    }

    public setAttributesFilters (filters: Array<SelectedAttribute>): void {
        this.selectedAttributes = filters;
    }

    public setDates(updatedDateFilter: DatesFilter): void {
        this.datesFilter = updatedDateFilter;
    }
}
