import { SelectedAttributePayload } from "./selected-attribute-payload";

export class SelectedAttributeFilter implements SelectedAttributePayload {
    AttributeFilterId: number;
    TypeId: number;
    AttributeId: number;

    constructor(attributeFilterId: number, typeId: number, attributeId: number) {
        this.AttributeFilterId = attributeFilterId;
        this.TypeId = typeId;
        this.AttributeId = attributeId;
    }
}