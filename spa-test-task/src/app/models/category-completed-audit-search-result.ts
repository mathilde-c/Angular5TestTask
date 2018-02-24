import { IItemCompletedAuditSearchResult } from "./item-completed-audit-search-result";

export class CategoryCompletedAuditSearchResult implements IItemCompletedAuditSearchResult {
    public FailedAuditCount: number;
    public CompletedAuditCount: number;
    public PassedAuditCount: number;
    public CategoryId: number;
    public CategoryName: string;

    public setId(val: number): void {
        this.CategoryId = val;
    }
    public setName(val: string): void {
        this.CategoryName = val;
    }
    public getId(): number {
        return this.CategoryId;
    }
    public getName(): string {
        return this.CategoryName;
    }
}
