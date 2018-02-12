import { Component, OnInit, OnDestroy } from '@angular/core';

import { FilterService } from '../../services/filter.service';
import { ItemCompletedAuditSearchResult } from '../../models/item-completed-audit-search-result';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  private resultList: Array<ItemCompletedAuditSearchResult> = [];
  private resultTypeTitle: string = "";
  private unsuscrieAll: Subject<boolean> = new Subject<boolean>();

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    this.filterService.upToDateSearchResults
      .takeUntil(this.unsuscrieAll)
      .subscribe(
        (resultArray: Array<ItemCompletedAuditSearchResult>) => this.resultList = resultArray,
        error => console.log("Error :: " + error)
      );

    this.filterService.upToDateSearchResultsTitle
    .takeUntil(this.unsuscrieAll)
    .subscribe(
      (title) => this.resultTypeTitle = title,
      error => console.log("Error :: " + error)
    );
  }

  ngOnDestroy(): void {
    this.unsuscrieAll.next(true);
    this.unsuscrieAll.unsubscribe();
  }

}
