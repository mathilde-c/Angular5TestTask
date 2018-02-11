import { AttributeType } from "./attribute-type";

export class Category {
    categoryId: number;
    name: string;
    demeritStartingScore: number;
    defaultTypeId: number;
    attributeTypes: Array<AttributeType>;
}