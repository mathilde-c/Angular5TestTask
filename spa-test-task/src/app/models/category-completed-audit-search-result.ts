import { ItemCompletedAuditSearchResult } from "./item-completed-audit-search-result";

export class CategoryCompletedAuditSearchResult implements ItemCompletedAuditSearchResult {
    getId(): number {
        return this.CategoryId;
    }
    getName(): string {
        return this.CategoryName;
    }

    FailedAuditCount: number;
    CompletedAuditCount: number;
    PassedAuditCount: number;
    CategoryId: number;
    CategoryName: string;
}