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
    

    // public clearAllAttributes(){
    //     this.selectedAttributes = [];
    // }

    // public setSelectedAttribute(attributeTypeId: number, attributeValueId: number): number{
    //     let index = this.retriveExistingAttributeFilterIndex(attributeTypeId);
        
    //     if (index > -1){
    //         this.selectedAttributes[index].attributeId = attributeValueId;
    //     } else {
    //         index = this.selectedAttributes.length; 
    //         this.selectedAttributes.push(new SelectedAttribute(index, attributeTypeId, attributeValueId));
    //     }

    //     return index;
    // }

    // public retriveExistingAttributeFilterIndex(attributeTypeId: number): number {
    //     return this.selectedAttributes.findIndex(a => a.attributeId === attributeTypeId);
    // }

    // public removeLastAttributeFilter(): void{
    //     if (this.selectedAttributes.length > 1){
    //         this.selectedAttributes.pop();
    //     }
    // }

    // public removeAllAttributeFilterFromIndex(startIndex: number): void{
    //     while(this.selectedAttributes.length > startIndex)
    //     {
    //         this.selectedAttributes.pop();
    //     }
    // }

    // public getInUseAttributeTypeIds(): Array<number> {
    //     let inUse: Array<number> = [];
    //     for(let attribute of this.selectedAttributes){
    //         inUse.push(attribute.attributeFilterId)
    //     }

    //     return inUse;
    // }
}
