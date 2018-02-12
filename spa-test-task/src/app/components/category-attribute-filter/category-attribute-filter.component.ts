import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';

import { AttributeType } from '../../models/attribute-type';
import { AttributeValue } from '../../models/attribute-value';
import { SelectedAttributeFilter } from '../../models/selected-attribute-filter';

@Component({
  selector: 'app-category-attribute-filter',
  templateUrl: './category-attribute-filter.component.html',
  styleUrls: ['./category-attribute-filter.component.css']
})
export class CategoryAttributeFilterComponent implements OnInit {
  @Input() attributeTypesList: Array<AttributeType>;
  @Input() attributeValuesList: Array<AttributeValue>;
  @Input() defaultSelectedAttributeTypeId: number; 

  @Output() onFiltersUpdated: EventEmitter<SelectedAttributeFilter> = new EventEmitter<SelectedAttributeFilter>();

  public id: number = null;

  public get selectedTypeId(): number { return this.selectedTypeIdValue; }
  public get selectedValueId(): number { return this.selectedValueIdValue; }

  public selectedTypeName = "";
  
  public set selectedTypeId (val) { 
    this.selectedTypeIdValue = val;
    this.selectedTypeName = this.retriveSelectedTypeName();
    this.selectedValueIdValue = null;
    this.EmitSelectAttributes();
  }
  public set selectedValueId (val) {
    this.selectedValueIdValue = val;
    this.EmitSelectAttributes();
  }
  private selectedTypeIdValue: number;
  private selectedValueIdValue: number;

  constructor() { }

  ngOnInit() {
    this.selectedTypeIdValue = this.defaultSelectedAttributeTypeId ? this.defaultSelectedAttributeTypeId : this.attributeTypesList[0].TypeId;
    this.selectedTypeName = this.retriveSelectedTypeName();
    this.selectedValueIdValue = (this.attributeValuesList && this.attributeValuesList.length > 0) ? this.attributeValuesList[0].AttributeId : null;
  }

  private EmitSelectAttributes(): void {
    let selectedOptions = new SelectedAttributeFilter(this.id, this.selectedTypeId, this.selectedValueIdValue, this.selectedTypeName);

    this.onFiltersUpdated.emit(selectedOptions);
  }

  private retriveSelectedTypeName(): string {
    return this.attributeTypesList.find(el => el.TypeId === this.selectedTypeId).Name;
  }
}
