import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserService } from './user.service';
import { CategoryCompletedAuditSearchResultList } from '../models/category-completed-audit-search-result-list';
import { CategoriesCompletedAuditListRequestPayload } from '../models/categories-completed-audit-list-request-payload';
import { CategoryCompletedAuditSearchResult } from '../models/category-completed-audit-search-result';
import { ItemCompletedAuditSearchResult } from '../models/item-completed-audit-search-result';
import { AttributeCompletedAuditSearchResult } from '../models/attribute-completed-audit-search-result';
import { AttributeCompletedAuditSearchResultList } from '../models/attribute-completed-audit-search-result-list';
import { Category } from '../models/category';
import { SelectedAttributeFilter } from '../models/selected-attribute-filter';
import { DatesFilter } from '../models/dates-filter';
import { AttributeCompletedAuditListRequestPayload } from '../models/attribute-completed-audit-list-request-payload';
import { SelectedAttributePayload } from '../models/selected-attribute-payload';
import { ItemCompletedAuditSearchResultList } from '../models/item-completed-audit-search-result-list';

@Injectable()
export class FilterService {

    private currentCategory: Category = null;
    private selectedAttributes: Array<SelectedAttributeFilter> = [];
    private datesFilter: DatesFilter = null;
    public upToDateSearchResults: BehaviorSubject<Array<ItemCompletedAuditSearchResult>> = new  BehaviorSubject<Array<ItemCompletedAuditSearchResult>>([]);
    public upToDateSearchResultsTitle: BehaviorSubject<string> = new  BehaviorSubject<string>('');

    constructor(private http: HttpClient,
    private userService: UserService) { }

    public searchCompletedAudits(stopSearch: Subject<boolean>): Observable<ItemCompletedAuditSearchResultList> {

        if (this.currentCategory != null
            && this.currentCategory.CategoryId != null){
            return this.AuditOnSpecificCategory(stopSearch);
        } else {
            return this.AuditOnAllCategories(stopSearch);
        }
    }

    private AuditOnSpecificCategory(stopSearch: Subject<boolean>): Observable<AttributeCompletedAuditSearchResultList> {
        let body: AttributeCompletedAuditListRequestPayload = new AttributeCompletedAuditListRequestPayload();
        body.CategoryId = this.currentCategory.CategoryId;
        body.StartMillis = this.datesFilter.fromMilliSec;
        body.EndMillis = this.datesFilter.toMilliSec;
        body.GroupByAttributeTypeId = this.getGroupingAttributeTypeId();
        body.SelectedAttributes = this.getSelectAttributesFilterWithValueId();
        body.UserId = this.userService.getUserId();
        
        let attriubutesFilterRequested = this.selectedAttributes;

        return this.http.post<AttributeCompletedAuditSearchResultList>("CompletedAudits", body)
        .takeUntil(stopSearch)
        .map(list => {
            let mappedArry: AttributeCompletedAuditSearchResult[]= list.Items.map(x => 
            {
                let item: AttributeCompletedAuditSearchResult = new AttributeCompletedAuditSearchResult();
                item.AttributeId = x.AttributeId;
                item.AttributeName = x.AttributeName;
                item.CompletedAuditCount = x.CompletedAuditCount;
                item.FailedAuditCount = x.FailedAuditCount;
                item.PassedAuditCount = x.PassedAuditCount;

                return item;
            })
            this.upToDateSearchResults.next(mappedArry);
            let groupingAttribute: SelectedAttributeFilter = attriubutesFilterRequested.find(el => el.TypeId === body.GroupByAttributeTypeId);
            if (groupingAttribute != null){
                this.upToDateSearchResultsTitle.next(groupingAttribute.TypeName);
            }

            let resultList: AttributeCompletedAuditSearchResultList = new AttributeCompletedAuditSearchResultList();
            resultList.Items = mappedArry;
            resultList.TotalAuditCount = list.TotalAuditCount;
            resultList.TotalFailedAuditCount = list.TotalFailedAuditCount;
            resultList.TotalPassedAuditCount = list.TotalPassedAuditCount;

            return resultList;
        });
    }
    private getGroupingAttributeTypeId(): number {
        return this.selectedAttributes[this.selectedAttributes.length-1].TypeId;
    }

    private getSelectAttributesFilterWithValueId(): SelectedAttributePayload[] {
        let attributes: SelectedAttributePayload[] = this.selectedAttributes.map(attr =>
            {
                let payload: SelectedAttributePayload = {
                    TypeId: attr.TypeId,
                    AttributeId: attr.AttributeId
                }
                return payload;
            });

        if (!this.hasLastAttributeFilterValue(attributes)) {
            attributes.pop();
        }
        return attributes;
    }
    private hasLastAttributeFilterValue(attributes: SelectedAttributePayload[]): any {
        return attributes[attributes.length-1].AttributeId !== null 
                && typeof(attributes[attributes.length-1].AttributeId) !== 'undefined';
    }

    private AuditOnAllCategories(stopSearch: Subject<boolean>): Observable<CategoryCompletedAuditSearchResultList> {
        let body: CategoriesCompletedAuditListRequestPayload = new CategoriesCompletedAuditListRequestPayload();
        body.UserId = this.userService.getUserId();
        body.StartMillis = this.datesFilter.fromMilliSec;
        body.EndMillis = this.datesFilter.toMilliSec;

        return this.http.post<CategoryCompletedAuditSearchResultList>("CategoryCompletedAudits", body)
                .takeUntil(stopSearch)
                .map(list => {
                    let mappedArry: CategoryCompletedAuditSearchResult[]= list.Items.map(x => 
                    {
                        let item: CategoryCompletedAuditSearchResult = new CategoryCompletedAuditSearchResult();
                        item.CategoryId = x.CategoryId;
                        item.CategoryName = x.CategoryName;
                        item.CompletedAuditCount = x.CompletedAuditCount;
                        item.FailedAuditCount = x.FailedAuditCount;
                        item.PassedAuditCount = x.PassedAuditCount;

                        return item;
                    })
                    this.upToDateSearchResults.next(mappedArry);
                    this.upToDateSearchResultsTitle.next("Category");
                    return list;
                });
    }

    public setCategory(newCategory: Category): void {
        this.currentCategory = newCategory;
    }

    public setAttributesFilters (filters: Array<SelectedAttributeFilter>): void {
        this.selectedAttributes = filters;
    }

    public setDates(updatedDateFilter: DatesFilter): void {
        this.datesFilter = updatedDateFilter;
    }
}
