import { ItemCompletedAuditSearchResult } from "./item-completed-audit-search-result";

export class AttributeCompletedAuditSearchResult implements ItemCompletedAuditSearchResult {
    setId(val: number): void {
        this.AttributeId = val;
    }
    setName(val: string): void {
        this.AttributeName = val;
    }
    getId(): number {
        return this.AttributeId;
    }
    getName(): string {
        return this.AttributeName;
    }

    FailedAuditCount: number;
    CompletedAuditCount: number;
    PassedAuditCount: number;
    AttributeId: number;
    AttributeName: string;
    Id: number;
}