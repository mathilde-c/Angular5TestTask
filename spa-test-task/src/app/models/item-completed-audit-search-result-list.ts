import { ItemCompletedAuditSearchResult } from "./item-completed-audit-search-result";


export interface ItemCompletedAuditSearchResultList {
    getItems(): Array<ItemCompletedAuditSearchResult>;
    TotalAuditCount: number;
    TotalFailedAuditCount: number;
    TotalPassedAuditCount: number;
}