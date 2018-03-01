import { ISelectedAttributePayload } from "./selected-attribute-payload";
import { CategoriesCompletedAuditListRequestPayload } from "./categories-completed-audit-list-request-payload";

export class AttributeCompletedAuditListRequestPayload extends CategoriesCompletedAuditListRequestPayload {
    public CategoryId: number;
    public GroupByAttributeTypeId: number;
    public SelectedAttributes: ISelectedAttributePayload[];

    public isEqual(other: AttributeCompletedAuditListRequestPayload): boolean {
        return super.isEqual(other)
            && this.CategoryId === other.CategoryId
            && this.GroupByAttributeTypeId === other.GroupByAttributeTypeId
            && this.SelectedAttributes === other.SelectedAttributes;
    }
}
