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
  @Input() attributeTypesList: Array<AttributeType> = [];
  @Output() onFiltersUpdated: EventEmitter<SelectedAttribute> = new EventEmitter<SelectedAttribute>();

  public attributeValuesList: Array<AttributeValue> = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
      this.onFiltersUpdated.emit(null);
  }

  public onAttributeTypeSelected(): void {
    this.updateAttributeValueList();

      this.EmitSelectAttributes();
  }

  private updateAttributeValueList(): void {
    // set default 
  }

    private EmitSelectAttributes() {
      // get selected value for type
      // get selected value for list
      // create new SelectedAttribute
      
        this.onFiltersUpdated.emit();
    }
}
