import { CategoryCompletedAuditSearchResult } from "./category-completed-audit-search-result";

export class ItemCompletedAuditSearchResult {
    Id: number;
    Name: string;
    FailedAuditCount: number;
    CompletedAuditCount: number;
    PassedAuditCount: number;

    public setFromCategoryCompletedAuditresultObject(item: CategoryCompletedAuditSearchResult){
        this.Id = item.CategoryId;
        this.Name = item.CategoryName;
        this.FailedAuditCount = item.FailedAuditCount;
        this.PassedAuditCount = item.PassedAuditCount;
        this.CompletedAuditCount = item.CompletedAuditCount;
    }
    
    public setFromAttributeCompletedAuditresultObject(item: AttributeCompletedAuditSearchResult){
        this.Id = item.CategoryId;
        this.Name = item.CategoryName;
        this.FailedAuditCount = item.FailedAuditCount;
        this.PassedAuditCount = item.PassedAuditCount;
        this.CompletedAuditCount = item.CompletedAuditCount;
    }
}