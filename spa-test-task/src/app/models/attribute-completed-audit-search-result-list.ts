import { AttributeCompletedAuditSearchResult } from "./attribute-completed-audit-search-result";


export interface AttributeCompletedAuditSearchResultList {
    Items: Array<AttributeCompletedAuditSearchResult>;
    TotalAuditCount: number;
    TotalFailedAuditCount: number;
    TotalPassedAuditCount: number;
}