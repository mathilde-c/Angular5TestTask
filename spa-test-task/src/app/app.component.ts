import { Component, OnInit } from '@angular/core';
import { DatesFilter } from './models/dates-filter';
import { AttributeType } from './models/attribute-type';
import { AttributeValue } from './models/attribute-value';
import { SelectedAttribute } from './models/selected-attribute';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular5 Test task';

  public attributeTypesList: Array<AttributeType> = [];
  public attributeValueList: Array<AttributeValue> = [];

  ngOnInit(): void {
    let at: AttributeType = new AttributeType();
    at.typeId = 1;
    at.displayOrder = 0;
    at.name = "at1";
    this.attributeTypesList.push(at);
    at = new AttributeType();
    at.typeId = 2;
    at.displayOrder = 1;
    at.name = "at2";
    this.attributeTypesList.push(at);

    let av: AttributeValue = new AttributeValue();
    av.id = 0;
    av.attributeId = undefined;
    av.attributeName = "All";
    this.attributeValueList.push(av);
    av = new AttributeValue();
    av.id = 1;
    av.attributeId = 600;
    av.attributeName = "av600";
    this.attributeValueList.push(av);
    av = new AttributeValue();
    av.id = 2;
    av.attributeId = 700;
    av.attributeName = "av700";
    this.attributeValueList.push(av);
  }

  public onNotifyDatesChanges(updatedDatesFilter: DatesFilter): void {
    console.log("value updated :: from: " + updatedDatesFilter.from + " | to: " + updatedDatesFilter.to);
  }

  public onFiltersClear(): void {
    console.log("clear filter triggered");
  }

  public onUpdateSub(event: SelectedAttribute){
    if (!event.attributeId){
      this.attributeValueList = [];
      let av: AttributeValue = new AttributeValue();
      av.id = 0;
      av.attributeId = null;
      av.attributeName = "All";
      this.attributeValueList.push(av);
      av = new AttributeValue();
      av.id = 1;
      av.attributeId = 600;
      av.attributeName = "av600";
      this.attributeValueList.push(av);
      av = new AttributeValue();
      av.id = 15;
      av.attributeId = 700;
      av.attributeName = "XXXX";
      this.attributeValueList.push(av);;

    }
  }
}
