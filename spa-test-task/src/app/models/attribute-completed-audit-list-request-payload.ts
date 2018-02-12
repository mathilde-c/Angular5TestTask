import { SelectedAttributePayload } from "./selected-attribute-payload";

export class AttributeCompletedAuditListRequestPayload {
    UserId: number;
    EndMillis:number;
    StartMillis:number;
    CategoryId: number;
    GroupByAttributeTypeId: number;
    SelectedAttributes: SelectedAttributePayload[];
    
    constructor() {
        
    }
}