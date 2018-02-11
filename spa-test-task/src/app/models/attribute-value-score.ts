import { AttributeValue } from "./attribute-value";

export class AttributeValueScore extends AttributeValue {
    passedPoints: number;
    failedPoints: number;
    score: number;
}