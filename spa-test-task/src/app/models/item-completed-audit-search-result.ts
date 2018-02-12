import { CategoryCompletedAuditSearchResult } from "./category-completed-audit-search-result";
import { AttributeCompletedAuditSearchResult } from "./attribute-completed-audit-search-result";

export interface ItemCompletedAuditSearchResult {
    getId(): number;
    getName(): string;
    setId(val: number): void;
    setName(val: string): void;
    FailedAuditCount: number;
    CompletedAuditCount: number;
    PassedAuditCount: number;
}