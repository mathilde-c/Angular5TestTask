import { IItemCompletedAuditSearchResult } from "./item-completed-audit-search-result";


export interface IItemCompletedAuditSearchResultList {
    TotalAuditCount: number;
    TotalFailedAuditCount: number;
    TotalPassedAuditCount: number;

    getItems(): Array<IItemCompletedAuditSearchResult>;
}
