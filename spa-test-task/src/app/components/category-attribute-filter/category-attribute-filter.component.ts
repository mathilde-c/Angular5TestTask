import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';

import { AttributeType } from '../../models/attribute-type';
import { AttributeValue } from '../../models/attribute-value';
import { SelectedAttribute } from '../../models/selected-attribute';

@Component({
  selector: 'app-category-attribute-filter',
  templateUrl: './category-attribute-filter.component.html',
  styleUrls: ['./category-attribute-filter.component.css']
})
export class CategoryAttributeFilterComponent implements OnInit, OnDestroy {
  @Input() attributeTypesList: Array<AttributeType>;
  @Input() attributeValuesList: Array<AttributeValue>;

  @Output() onFiltersUpdated: EventEmitter<SelectedAttribute> = new EventEmitter<SelectedAttribute>();

  public get selectedTypeId(): number { return this.selectedTypeIdValue; }
  public get selectedValueId(): number { return this.selectedValueIdValue; }
  
  public set selectedTypeId (val) { 
    this.selectedTypeIdValue = val;
    this.EmitSelectAttributes();
  }
  public set selectedValueId (val) {
    this.selectedTypeIdValue = val;
    this.EmitSelectAttributes();
  }
  private selectedTypeIdValue: number;
  private selectedValueIdValue: number;

  constructor() { }

  ngOnInit() {
    this.selectedTypeIdValue = this.attributeTypesList[0].typeId;
    this.selectedValueIdValue = this.attributeValuesList[0].attributeId;
  }

  ngOnDestroy(): void {
      this.onFiltersUpdated.emit(null);
  }

  private EmitSelectAttributes() {
    let selectedOptions = new SelectedAttribute(this.selectedTypeIdValue, this.selectedValueIdValue);

    this.onFiltersUpdated.emit(selectedOptions);
  }
}
