import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from "@angular/core";

import { AttributeType } from "../../models/attribute-type";
import { AttributeValue } from "../../models/attribute-value";
import { SelectedAttributeFilter } from "../../models/selected-attribute-filter";

@Component({
    selector: "app-category-attribute-filter",
    templateUrl: "./category-attribute-filter.component.html",
    styleUrls: ["./category-attribute-filter.component.css"]
})
export class CategoryAttributeFilterComponent implements OnInit {
    @Input() public attributeTypesList: Array<AttributeType>;
    @Input() public attributeValuesList: Array<AttributeValue>;
    @Input() public defaultSelectedAttributeTypeId: number;

    @Output() public onFiltersUpdated: EventEmitter<SelectedAttributeFilter> = new EventEmitter<SelectedAttributeFilter>();

    public id: number = null;

    public get selectedTypeId(): number { return this.selectedTypeIdValue; }
    public get selectedValueId(): number { return this.selectedValueIdValue; }

    public selectedTypeName: string = "";

    public set selectedTypeId(val) {
        this.selectedTypeIdValue = val;
        this.selectedTypeName = this.retriveSelectedTypeName();
        this.selectedValueIdValue = null;
        this.EmitSelectAttributes();
    }
    public set selectedValueId(val) {
        this.selectedValueIdValue = val;
        this.EmitSelectAttributes();
    }
    private selectedTypeIdValue: number;
    private selectedValueIdValue: number;

    constructor() { }

    public ngOnInit(): void {
        this.selectedTypeIdValue = this.initializeSelectedType();
        this.selectedTypeName = this.retriveSelectedTypeName();
        this.selectedValueIdValue = this.initializeSelectedValue();
    }
    private initializeSelectedType(): number {
        return !(this.defaultSelectedAttributeTypeId === undefined || this.defaultSelectedAttributeTypeId === null)
            ? this.defaultSelectedAttributeTypeId
            : this.attributeTypesList && this.attributeTypesList.length > 0
                ? this.attributeTypesList[0].TypeId
                : null;
    }

    private initializeSelectedValue(): number {
        return (this.attributeValuesList && this.attributeValuesList.length > 0)
            ? this.attributeValuesList[0].AttributeId
            : null;
    }

    private EmitSelectAttributes(): void {
        const selectedOptions = new SelectedAttributeFilter(this.id, this.selectedTypeId, this.selectedValueIdValue, this.selectedTypeName);

        this.onFiltersUpdated.emit(selectedOptions);
    }

    private retriveSelectedTypeName(): string {
        const attribute: AttributeType = this.attributeTypesList.find(el => el.TypeId === this.selectedTypeId);
        return attribute
            ? attribute.Name
            : null;
    }
}
