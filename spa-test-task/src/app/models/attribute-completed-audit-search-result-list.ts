import { AttributeCompletedAuditSearchResult } from "./attribute-completed-audit-search-result";


export class AttributeCompletedAuditSearchResultList {
    Items: Array<AttributeCompletedAuditSearchResult>;
    TotalAuditCount: number;
    TotalFailedAuditCount: number;
    TotalPassedAuditCount: number;
}