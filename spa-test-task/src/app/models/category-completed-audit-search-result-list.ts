import { CategoryCompletedAuditSearchResult } from "./category-completed-audit-search-result";

export interface CategoryCompletedAuditSearchResultList {
    Items: Array<CategoryCompletedAuditSearchResult>;
    TotalAuditCount: number;
    TotalFailedAuditCount: number;
    TotalPassedAuditCount: number;
}