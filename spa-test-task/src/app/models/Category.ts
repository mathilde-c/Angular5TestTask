import { AttributeType } from "./attribute-type";

export interface Category {
    CategoryId: number;
    Name: string;
    DemeritStartingScore: number;
    DefaultTypeId: number;
    AttributeTypes: AttributeType[];
}