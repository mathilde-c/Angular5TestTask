import { IItemCompletedAuditSearchResult } from "./item-completed-audit-search-result";

export class AttributeCompletedAuditSearchResult implements IItemCompletedAuditSearchResult {
    public FailedAuditCount: number;
    public CompletedAuditCount: number;
    public PassedAuditCount: number;
    public AttributeId: number;
    public AttributeName: string;
    public Id: number;

    public setId(val: number): void {
        this.AttributeId = val;
    }
    public setName(val: string): void {
        this.AttributeName = val;
    }
    public getId(): number {
        return this.AttributeId;
    }
    public getName(): string {
        return this.AttributeName;
    }
}
