import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { CategoryService } from '../../services/category.service';
import { FilterService } from '../../services/filter.service';
import { AttributesFilterContainerDirective } from '../../tools/attributes-filter-container.directive';
import { SelectedAttribute } from '../../models/selected-attribute';
import { Category } from '../../models/category';
import { CategoryAttributeFilterComponent } from '../category-attribute-filter/category-attribute-filter.component';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit, OnDestroy {
  // @ViewChild('parent', {read: ViewContainerRef}) container: ViewContainerRef;
  @ViewChild(AttributesFilterContainerDirective) attributeContainer: AttributesFilterContainerDirective;

  public categoryList: Array<Category> = [];
  private allCategoriesCat = new Category();
  public selectedCategory: Category  = new Category();

  private hashAttributeFilterComponents = {};

  private unsuscribeAll: Subject<boolean> = new Subject<boolean>();
  private stopSearch: Subject<boolean> = new Subject<boolean>();

  constructor(private filteringService: FilterService,
              private categoryService: CategoryService,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.initializeAllCategoriesCat();
    this.InitializeCategories();

    this.selectedCategory = this.allCategoriesCat;
    this.onCategoryChange(this.selectedCategory);
  }
  ngOnDestroy(): void {
    this.unsuscribeAll.next(true);
    this.unsuscribeAll.unsubscribe();

    this.stopSearch.next(true);
    this.stopSearch.unsubscribe();
  }

  private InitializeCategories(): void {
    this.categoryList.push(this.allCategoriesCat);

    let listOfCategoryFomServer: Array<Category> = [];
    this.categoryService.getCategories()
      .takeUntil(this.unsuscribeAll)
      .subscribe(
        resultArray => {
          this.categoryList = this.categoryList.concat(resultArray);
        },
        error => console.log("Error :: " + error)
      );
  }

  private initializeAllCategoriesCat() {
      this.allCategoriesCat.attributeTypes = [];
      this.allCategoriesCat.categoryId = null;
      this.allCategoriesCat.defaultTypeId = null;
      this.allCategoriesCat.name = "All categories";
  }

  public onCategoryChange(newCategory: Category): void {
    console.log("new cat:  " + newCategory.categoryId);

    this.stopSearch.next(true);

    this.filteringService.setCategory(newCategory);
    this.clearSelectedAttributes(newCategory);

    if (newCategory
        && newCategory.categoryId){
        // clear attributes + destroy childs components
        // if default: add default attributes (assume default is)
        // set new category
        // trigger search over AuditScores
        let categoryAttributeFilterComponent  = this.componentFactoryResolver.resolveComponentFactory(CategoryAttributeFilterComponent);
        let compRef: ComponentRef<CategoryAttributeFilterComponent> = this.attributeContainer.viewContainerRef.createComponent(categoryAttributeFilterComponent);
        compRef.instance.attributeTypesList = newCategory.attributeTypes;
    } else {
      // --> all cat
      // clear attributes + destroy childs components
      // trigger search over all cat: CategoryAuditScores
    }

    this.filteringService.searchCompletedAudits(this.stopSearch)
      .takeUntil(this.stopSearch)
      .subscribe();
  }

  private clearSelectedAttributes(newCategory: Category): void {
    this.filteringService.clearAllAttributes();
    // clear children attributes

    if (newCategory && newCategory.defaultTypeId){
      this.setSelectedAttribute(newCategory.defaultTypeId, null);
    }
  }

  private setSelectedAttribute(attributeTypeId: number, attributeValueId: number){
    let indexOfExisting = this.filteringService.retriveExistingAttributeFilterIndex(attributeTypeId);
    if (indexOfExisting > -1){
      // remove following attr
    }

    this.filteringService.setSelectedAttribute(attributeTypeId, attributeValueId);

    // if no attribute existe: add attribute
  }
}
