import { CategoryCompletedAuditSearchResult } from "./category-completed-audit-search-result";
import { ItemCompletedAuditSearchResultList } from "./item-completed-audit-search-result-list";

export class CategoryCompletedAuditSearchResultList implements ItemCompletedAuditSearchResultList {
    getItems(): CategoryCompletedAuditSearchResult[] {
        return this.Items;
    }
    Items: Array<CategoryCompletedAuditSearchResult>;
    TotalAuditCount: number;
    TotalFailedAuditCount: number;
    TotalPassedAuditCount: number;
}