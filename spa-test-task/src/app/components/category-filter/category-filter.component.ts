import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../models/Category';
import { FilterService } from '../../services/filter.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit, OnDestroy {

  public categoryList: Array<Category> = [];

  private unsuscribeAll: Subject<boolean> = new Subject<boolean>();

  constructor(private filteringService: FilterService) { }

  ngOnInit() {
      this.InitializeCategories();
  }
  ngOnDestroy(): void {
    this.unsuscribeAll.next(true);
    this.unsuscribeAll.unsubscribe();
  }


  private InitializeCategories(): void {
      this.initializeAllCategoriesFitler();

      let listOfCategoryFomServer: Array<Category> = [];
      this.filteringService.getCategories()
        .takeUntil(this.unsuscribeAll)
        .subscribe(
          resultArray => {
            this.categoryList = this.categoryList.concat(resultArray);
          },
          error => console.log("Error :: " + error)
        );
  }

  private initializeAllCategoriesFitler() {
      let allCategories: Category = new Category();
      allCategories.attributeTypes =[];
      allCategories.categoryId = null;
      allCategories.defaultTypeId = null;
      allCategories.name = "All categories";
      this.categoryList.push(allCategories);
  }
}
