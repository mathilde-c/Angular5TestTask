import { CategoryCompletedAuditSearchResult } from "./category-completed-audit-search-result";
import { IItemCompletedAuditSearchResultList } from "./item-completed-audit-search-result-list";

export class CategoryCompletedAuditSearchResultList implements IItemCompletedAuditSearchResultList {
    public Items: Array<CategoryCompletedAuditSearchResult>;
    public TotalAuditCount: number;
    public TotalFailedAuditCount: number;
    public TotalPassedAuditCount: number;

    public getItems(): Array<CategoryCompletedAuditSearchResult> {
        return this.Items;
    }
}
