import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DatesFilter } from "../../models/dates-filter";
import { Moment } from "moment";
import * as moment from "moment/moment";

@Component({
  selector: "app-dates-filter",
  templateUrl: "./dates-filter.component.html",
  styleUrls: ["./dates-filter.component.css"]
})
export class DatesFilterComponent implements OnInit {
  @Output() public notifyDatesChanges: EventEmitter<DatesFilter> = new EventEmitter<DatesFilter>();

  public get from() { return this.fromDateValue; }
  public set from (val) {
    if (this.fromDateValue !== val) {
      this.fromDateValue = val;
      this.emitDatesValues();
    }
  }

  public get to() { return this.toDateValue; }
  public set to (val) {
    if (this.toDateValue !== val) {
      this.toDateValue = val;
      this.emitDatesValues();
    }
  }

  private fromDateValue: Moment;
  private toDateValue: Moment;

  constructor() { }

  public ngOnInit(): void {
    const today: Date = new Date(Date.now());
    today.setHours(0);

    this.fromDateValue = this.computerStartDate(today);
    this.toDateValue =  this.computerEndDate(today);
      this.emitDatesValues();
  }

  private computerEndDate(today: Date): Moment {
    today.setHours(23, 59);
    const month: number = today.getMonth() + 1;
    const year: number = today.getFullYear();

    return moment(new Date(year, month, 0));
  }

  private computerStartDate(today: Date): Moment {
    const month: number = today.getMonth();
    const year: number = today.getFullYear();

    return moment(new Date(year, month, 1));
  }

  private emitDatesValues() {
    const fromMilli: number = new Date(this.from.unix()).getTime() * 1000;
    const toMilli: number = new Date(this.to.unix()).getTime() * 1000;
    this.notifyDatesChanges.emit(new DatesFilter(fromMilli, toMilli));
  }
}
