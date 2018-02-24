import { ISelectedAttributePayload } from "./selected-attribute-payload";

export class SelectedAttributeFilter implements ISelectedAttributePayload {
    public AttributeFilterId: number;
    public TypeId: number;
    public AttributeId: number;
    public TypeName: string;

    constructor(attributeFilterId: number, typeId: number, attributeId: number, typeName: string = "") {
        this.AttributeFilterId = attributeFilterId;
        this.TypeId = typeId;
        this.AttributeId = attributeId;
        this.TypeName = typeName;
    }
}
