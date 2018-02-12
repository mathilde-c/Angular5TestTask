import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { FilterService } from '../../services/filter.service';
import { ItemCompletedAuditSearchResult } from '../../models/item-completed-audit-search-result';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public resultList: Array<ItemCompletedAuditSearchResult> = [];
  public resultTypeTitle: string = "";

  public displayedColumns = ['nameCat', 'completedAudits'];
  public dataSource: MatTableDataSource<ItemCompletedAuditSearchResult>;

  private unsuscrieAll: Subject<boolean> = new Subject<boolean>();

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    this.filterService.upToDateSearchResults
      .takeUntil(this.unsuscrieAll)
      .subscribe(
        (resultArray: Array<ItemCompletedAuditSearchResult>) => {
            this.resultList = resultArray;
            this.dataSource = new MatTableDataSource<ItemCompletedAuditSearchResult>(this.resultList);
            this.dataSource.paginator = this.paginator;
        }
      );

    this.filterService.upToDateSearchResultsTitle
    .takeUntil(this.unsuscrieAll)
    .subscribe(
      (title) =>{
        this.resultTypeTitle = title;
      }
    );
  }

  ngOnDestroy(): void {
    this.unsuscrieAll.next(true);
    this.unsuscrieAll.unsubscribe();
  }

}
