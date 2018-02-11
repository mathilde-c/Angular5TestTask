import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';

import { AttributeType } from '../../models/attribute-type';
import { AttributeValue } from '../../models/attribute-value';
import { SelectedAttribute } from '../../models/selected-attribute';

@Component({
  selector: 'app-category-attribute-filter',
  templateUrl: './category-attribute-filter.component.html',
  styleUrls: ['./category-attribute-filter.component.css']
})
export class CategoryAttributeFilterComponent implements OnInit {
  @Input() attributeTypesList: Array<AttributeType>;
  @Input() attributeValuesList: Array<AttributeValue>;
  @Input() defaultSelectedAttributeTypeId: number; 

  @Output() onFiltersUpdated: EventEmitter<SelectedAttribute> = new EventEmitter<SelectedAttribute>();

  public id: number = null;

  public get selectedTypeId(): number { return this.selectedTypeIdValue; }
  public get selectedValueId(): number { return this.selectedValueIdValue; }
  
  public set selectedTypeId (val) { 
    this.selectedTypeIdValue = val;
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
    this.selectedValueIdValue = (this.attributeValuesList && this.attributeValuesList.length > 0) ? this.attributeValuesList[0].AttributeId : null;
  }

  private EmitSelectAttributes(): void {
    let selectedOptions = new SelectedAttribute(this.id, this.selectedTypeId, this.selectedValueIdValue);

    this.onFiltersUpdated.emit(selectedOptions);
  }
}
