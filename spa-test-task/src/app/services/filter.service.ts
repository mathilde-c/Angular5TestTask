import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    constructor(private http: HttpClient,
    private userService: UserService) { }

    public searchCompletedAudits(stopSearch: Subject<boolean>): Observable<Array<CompletedAuditSearchResult>> {

        //api call takeUntil(stopWatch)
        let dummyResults: Array<CompletedAuditSearchResult> = [];
  
        let dummy: CompletedAuditSearchResult = new CompletedAuditSearchResult();
        dummy.categoryName = "dummyResult";
        dummy.categoryId = 1;
        dummy.completedAuditCount = 2;
        dummy.failedAuditCount = 0;
        dummyResults.push(dummy)
        dummy.categoryName = "dummyResult2";
        dummy.categoryId = 2;
        dummy.completedAuditCount = 5;
        dummy.failedAuditCount = 7;
        dummyResults.push(dummy)
  
        return Observable.of(dummyResults);
    }

    public setCategory(newCategory: Category): void {
        this.currentCategoryId = newCategory.categoryId;
    }

    public clearAllAttributes(){
        this.selectedAttributes = [];
    }

    public setSelectedAttribute(attributeTypeId: number, attributeValueId: number){
        let existingIndex = this.retriveExistingAttributeFilterIndex(attributeTypeId);
        
        if (existingIndex > -1){
            this.selectedAttributes[existingIndex].attributeId = attributeValueId;
        } else {
            this.selectedAttributes.push(new SelectedAttribute(attributeTypeId, attributeValueId));
        }
    }

    public retriveExistingAttributeFilterIndex(attributeTypeId: number): number {
        return this.selectedAttributes.findIndex(a => a.attributeId === attributeTypeId);
    }

    public removeLastAttributeFilter(): void{
        if (this.selectedAttributes.length > 1){
            this.selectedAttributes.pop();
        }
    }

    public removeAllAttributeFilterFromIndex(startIndex: number): void{
        while(this.selectedAttributes.length > startIndex)
        {
            this.selectedAttributes.pop();
        }
    }
}
