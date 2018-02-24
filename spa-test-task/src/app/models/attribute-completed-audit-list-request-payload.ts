import { ISelectedAttributePayload } from "./selected-attribute-payload";

export class AttributeCompletedAuditListRequestPayload {
    public UserId: number;
    public EndMillis: number;
    public StartMillis: number;
    public CategoryId: number;
    public GroupByAttributeTypeId: number;
    public SelectedAttributes: ISelectedAttributePayload[];
}
