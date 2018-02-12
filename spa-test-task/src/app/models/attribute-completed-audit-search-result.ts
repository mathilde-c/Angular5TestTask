import { ItemCompletedAuditSearchResult } from "./item-completed-audit-search-result";

export interface AttributeCompletedAuditSearchResult {
    
    FailedAuditCount: number;
    CompletedAuditCount: number;
    PassedAuditCount: number;
    AttributeId: number;
    AttributeName: string;
}