import { Component } from '@angular/core';
import { DatesFilter } from './models/dates-filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular5 Test task';

  public onNotifyDatesChanges(updatedDatesFilter: DatesFilter): void {
    console.log("value updated :: from: " + updatedDatesFilter.from + " | to: " + updatedDatesFilter.to);
  }

  public onFiltersClear(): void {
    console.log("clear filter triggered");
  }
}
