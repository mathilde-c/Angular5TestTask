import { AttributeCompletedAuditSearchResult } from "./attribute-completed-audit-search-result";
import { IItemCompletedAuditSearchResultList } from "./item-completed-audit-search-result-list";
import { IItemCompletedAuditSearchResult } from "./item-completed-audit-search-result";


export class AttributeCompletedAuditSearchResultList implements IItemCompletedAuditSearchResultList {
    public Items: AttributeCompletedAuditSearchResult[];
    public TotalAuditCount: number;
    public TotalFailedAuditCount: number;
    public TotalPassedAuditCount: number;

    public getItems(): AttributeCompletedAuditSearchResult[] {
        return this.Items;
    }
}
