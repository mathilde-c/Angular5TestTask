import { AttributeType } from "./attribute-type";

export interface ICategory {
    CategoryId: number;
    Name: string;
    DemeritStartingScore: number;
    DefaultTypeId: number;
    AttributeTypes: Array<AttributeType>;
}
