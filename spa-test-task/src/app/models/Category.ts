import { AttributeType } from "./attribute-type";

export class Category {
    CategoryId: number;
    Name: string;
    DemeritStartingScore: number;
    DefaultTypeId: number;
    AttributeTypes: Array<AttributeType>;
}