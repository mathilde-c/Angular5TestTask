import { Component, OnInit } from '@angular/core';

import { FilterService } from '../../services/filter.service';
import { DatesFilter } from '../../models/dates-filter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(private filteringService: FilterService) { }

  ngOnInit() {
  }

  public updateDateChange(updatedDateFilter: DatesFilter){
    this.filteringService.setDates(updatedDateFilter);
  }

}
