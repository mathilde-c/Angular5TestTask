import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserService } from './user.service';
import { Category } from '../models/category';
import { SelectedAttribute } from '../models/selected-attribute';
import { CompletedAuditSearchResult } from '../models/completed-audit-search-result';

@Injectable()
export class FilterService {

    private currentCategoryId: number = null;
    private selectedAttributes: Array<SelectedAttribute> = [];
    private fromDate: Date;
    private toDate: Date;

    constructor(private http: HttpClient,
    private userService: UserService) { }

    public searchCompletedAudits(stopSearch: Subject<boolean>): Observable<Array<CompletedAuditSearchResult>> {

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

    public setCategory(newCategory: Category): void {
        this.currentCategoryId = newCategory.CategoryId;
    }

    public setAttributesFilters (filters: Array<SelectedAttribute>): void {
        this.selectedAttributes = filters;
    }

    public setDates(from: Date, to: Date): void {
        this.fromDate = from;
        this.toDate = to;
    }
}
