import { ItemCompletedAuditSearchResult } from "./item-completed-audit-search-result";

export class CategoryCompletedAuditSearchResult implements ItemCompletedAuditSearchResult {
    setId(val: number): void {
        this.CategoryId = val;
    }
    setName(val: string): void {
        this.CategoryName = val;
    }
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