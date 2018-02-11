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
    at.TypeId = 1;
    at.DisplayOrder = 0;
    at.Name = "at1";
    this.attributeTypesList.push(at);
    at = new AttributeType();
    at.TypeId = 2;
    at.DisplayOrder = 1;
    at.Name = "at2";
    this.attributeTypesList.push(at);

    let av: AttributeValue = new AttributeValue();
    av.Id = 0;
    av.AttributeId = undefined;
    av.AttributeName = "All";
    this.attributeValueList.push(av);
    av = new AttributeValue();
    av.Id = 1;
    av.AttributeId = 600;
    av.AttributeName = "av600";
    this.attributeValueList.push(av);
    av = new AttributeValue();
    av.Id = 2;
    av.AttributeId = 700;
    av.AttributeName = "av700";
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
      av.Id = 0;
      av.AttributeId = null;
      av.AttributeName = "All";
      this.attributeValueList.push(av);
      av = new AttributeValue();
      av.Id = 1;
      av.AttributeId = 600;
      av.AttributeName = "av600";
      this.attributeValueList.push(av);
      av = new AttributeValue();
      av.Id = 15;
      av.AttributeId = 700;
      av.AttributeName = "XXXX";
      this.attributeValueList.push(av);;

    }
  }
}
