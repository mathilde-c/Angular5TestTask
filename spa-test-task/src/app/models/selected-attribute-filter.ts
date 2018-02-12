import { SelectedAttributePayload } from "./selected-attribute-payload";

export class SelectedAttributeFilter implements SelectedAttributePayload {
    AttributeFilterId: number;
    TypeId: number;
    AttributeId: number;
    TypeName: string;

    constructor(attributeFilterId: number, typeId: number, attributeId: number, typeName: string = "") {
        this.AttributeFilterId = attributeFilterId;
        this.TypeId = typeId;
        this.AttributeId = attributeId;
        this.TypeName = typeName;
    }
}