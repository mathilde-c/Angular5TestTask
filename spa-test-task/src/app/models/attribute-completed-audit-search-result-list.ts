import { AttributeCompletedAuditSearchResult } from "./attribute-completed-audit-search-result";
import { ItemCompletedAuditSearchResultList } from "./item-completed-audit-search-result-list";
import { ItemCompletedAuditSearchResult } from "./item-completed-audit-search-result";


export class AttributeCompletedAuditSearchResultList implements ItemCompletedAuditSearchResultList {
    getItems(): AttributeCompletedAuditSearchResult[] {
        return this.Items;
    }
    Items: AttributeCompletedAuditSearchResult[];
    TotalAuditCount: number;
    TotalFailedAuditCount: number;
    TotalPassedAuditCount: number;
}