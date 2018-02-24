import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";

import { FilterService } from "../../services/filter.service";
import { IItemCompletedAuditSearchResult } from "../../models/item-completed-audit-search-result";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.css"]
})
export class SearchResultComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) public paginator: MatPaginator;

  public resultList: Array<IItemCompletedAuditSearchResult> = [];
  public resultTypeTitle: string = "";

  public displayedColumns = ["nameCat", "completedAudits", "graph"];
  public dataSource: MatTableDataSource<IItemCompletedAuditSearchResult>;

  private unsuscrieAll: Subject<boolean> = new Subject<boolean>();

  constructor(private filterService: FilterService) { }

  public ngOnInit(): void {
    this.filterService.upToDateSearchResults
      .takeUntil(this.unsuscrieAll)
      .subscribe(
        (resultArray: Array<IItemCompletedAuditSearchResult>) => {
            this.resultList = resultArray;
            this.dataSource = new MatTableDataSource<IItemCompletedAuditSearchResult>(this.resultList);
            this.dataSource.paginator = this.paginator;
        }
      );

    this.filterService.upToDateSearchResultsTitle
    .takeUntil(this.unsuscrieAll)
    .subscribe(
      (title) => {
        this.resultTypeTitle = title;
      }
    );
  }

  public ngOnDestroy(): void {
    this.unsuscrieAll.next(true);
    this.unsuscrieAll.unsubscribe();
  }

  public getPassRate(result: IItemCompletedAuditSearchResult): number {
    return (result.PassedAuditCount / result.CompletedAuditCount) * 100.0;
  }
  public getFailRate(result: IItemCompletedAuditSearchResult): number {
    return (result.FailedAuditCount / result.CompletedAuditCount) * 100.0;
  }

}
