import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserService } from './user.service';
import { Category } from '../models/category';
import { SelectedAttribute } from '../models/selected-attribute';
import { DatesFilter } from '../models/dates-filter';
import { ApiCallService } from './api-call.service';
import { CategoryCompletedAuditSearchResultList } from '../models/category-completed-audit-search-result-list';
import { CategoriesCompletedAuditListRequestPayload } from '../models/categories-completed-audit-list-request-payload';
import { CategoryCompletedAuditSearchResult } from '../models/category-completed-audit-search-result';
import { ItemCompletedAuditSearchResult } from '../models/item-completed-audit-search-result';

@Injectable()
export class FilterService {

    private currentCategoryId: number = null;
    private selectedAttributes: Array<SelectedAttribute> = [];
    private datesFilter: DatesFilter = null;
    public upToDateSearchResults: BehaviorSubject<Array<ItemCompletedAuditSearchResult>> = new  BehaviorSubject<Array<ItemCompletedAuditSearchResult>>([]);

    constructor(private http: HttpClient,
        private apiService: ApiCallService,
    private userService: UserService) { }

    public searchCompletedAudits(stopSearch: Subject<boolean>): Observable<Array<CategoryCompletedAuditSearchResult>> {

        if (this.currentCategoryId != null){
            // call AuditScores on Category
        } else {
            // call CategoryAuditScores
            return this.AuditOnAllCategories(stopSearch);
        }
        //api call takeUntil(stopWatch)
        let dummyResults: Array<CategoryCompletedAuditSearchResult> = [];

        let dummy: CategoryCompletedAuditSearchResult = new CategoryCompletedAuditSearchResult();
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

    private AuditOnAllCategories(stopSearch: Subject<boolean>): Observable<Array<CategoryCompletedAuditSearchResult>> {
        let body: CategoriesCompletedAuditListRequestPayload = new CategoriesCompletedAuditListRequestPayload();
        body.UserId = this.userService.getUserId();
        body.StartMillis = this.datesFilter.fromMilliSec;
        body.EndMillis = this.datesFilter.toMilliSec;

        return this.apiService.makePostCall<CategoryCompletedAuditSearchResultList>("CategoryCompletedAudits", body)
                .takeUntil(stopSearch)
                .map(list => {
                    let mappedArry: ItemCompletedAuditSearchResult[]= list.Items.map(x => 
                        {
                            let item: ItemCompletedAuditSearchResult = new ItemCompletedAuditSearchResult();
                            item.setFromCategoryCompletedAuditresultObject(x)
                            return item;
                        })
                    this.upToDateSearchResults.next(mappedArry);
                    return list.Items;
                });
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
