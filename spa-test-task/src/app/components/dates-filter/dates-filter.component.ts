import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatesFilter } from '../../models/dates-filter';

@Component({
  selector: 'app-dates-filter',
  templateUrl: './dates-filter.component.html',
  styleUrls: ['./dates-filter.component.css']
})
export class DatesFilterComponent implements OnInit {
  @Output() notifyDatesChanges: EventEmitter<DatesFilter> = new EventEmitter<DatesFilter>();
  
  public get from() { return this.fromDateValue; }
  public set from (val) {
    if (this.fromDateValue != val){
      this.fromDateValue = val;
      this.notifyDatesChanges.emit(new DatesFilter(this.fromDateValue, this.toDateValue));
    }
  }

  public get to() { return this.toDateValue; }
  public set to (val) {
    if (this.toDateValue != val){
      this.toDateValue = val;
      this.notifyDatesChanges.emit(new DatesFilter(this.fromDateValue, this.toDateValue));
    }
  }

  public fromDateValue: Date;
  private toDateValue: Date;

  constructor() { }

  ngOnInit() {
    this.fromDateValue = this.computerStartDate(new Date(Date.now()));
    this.toDateValue =  this.computerEndDate(this.fromDateValue);
  }

  private computerEndDate(startDate: Date): Date {
    let month: number = startDate.getMonth() + 1;
    let year: number = startDate.getFullYear();

    return new Date(year, month, 0);
  }

  private computerStartDate(today: Date): Date {
    let month: number = today.getMonth();
    let year: number = today.getFullYear();

    return new Date(year, month, 1);
  }

}
