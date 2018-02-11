import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { CategoryService } from '../../services/category.service';
import { FilterService } from '../../services/filter.service';
import { AttributesFilterContainerDirective } from '../../tools/attributes-filter-container.directive';
import { SelectedAttribute } from '../../models/selected-attribute';
import { Category } from '../../models/category';
import { CategoryAttributeFilterComponent } from '../category-attribute-filter/category-attribute-filter.component';
import { AttributeType } from '../../models/attribute-type';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit, OnDestroy {
  @ViewChild(AttributesFilterContainerDirective) attributeContainer: AttributesFilterContainerDirective;

  public categoryList: Array<Category> = [];
  private allCategoriesCat = new Category();
  public selectedCategory: Category  = new Category();

  private hashAttributeFilterComponents = new Map<number, ComponentRef<CategoryAttributeFilterComponent>>(); 

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
    this.stopSearch.next(true);

    this.filteringService.setCategory(newCategory);
    this.clearAttributeFilterComponents();

    if (newCategory
        && newCategory.categoryId){
      this.setSelectedAttribute(newCategory.defaultTypeId, newCategory, null);
    } 

    this.filteringService.searchCompletedAudits(this.stopSearch)
      .takeUntil(this.stopSearch)
      .subscribe();
  }

  private clearAttributeFilterComponents(): void {
    // this.filteringService.clearAllAttributes();

    let numberOfComponent:number = this.hashAttributeFilterComponents.size;
    for (let i:number = 0; i < numberOfComponent; i++){
      this.removeAttributeFilterComponent(i);
    }

    this.hashAttributeFilterComponents.clear();
  }

  private setSelectedAttribute(attributeTypeId: number, category: Category, attributeValueId: number, idOfAttributeComponent: number = null){
    if (!category){
      category = this.selectedCategory;
    }

    // let index: number = this.filteringService.setSelectedAttribute(category.defaultTypeId, attributeValueId);

    if (idOfAttributeComponent != null){
      for(let i:number = this.hashAttributeFilterComponents.size - 1; i > idOfAttributeComponent; i--)
      {
        this.removeAttributeFilterComponent(i);
      }
      // update the existing component
    } else {
      this.createAttributeFilterComponent(attributeTypeId, this.hashAttributeFilterComponents.size, category);
    }
  }

  private createAttributeFilterComponent(attributeTypeId: number, index: number, category: Category): ComponentRef<CategoryAttributeFilterComponent> {
    let categoryAttributeFilterComponent  = this.componentFactoryResolver.resolveComponentFactory(CategoryAttributeFilterComponent);
    let compRef: ComponentRef<CategoryAttributeFilterComponent> = this.attributeContainer.viewContainerRef.createComponent(categoryAttributeFilterComponent);
    compRef.instance.defaultSelectedAttributeTypeId = attributeTypeId;
    compRef.instance.defaultSelectedAttributeTypeId = attributeTypeId;
    compRef.instance.id = index;
    compRef.instance.onFiltersUpdated.subscribe(
      selectedAttribute => {
        console.log("selected attribute change!! : " + selectedAttribute);
        this.setSelectedAttribute(selectedAttribute.attributeFilterId, null, selectedAttribute.attributeId, selectedAttribute.attributeFilterId);
      }
    );

    if (this.hashAttributeFilterComponents.size > 0){
      compRef.instance.attributeTypesList = this.findAttributeFilterUsable(category);
    } else {
      compRef.instance.attributeTypesList = category.attributeTypes;
    }

    this.hashAttributeFilterComponents.set(index, compRef);

    return compRef;
  }

  private removeAttributeFilterComponent(key: number):void {
      // this.hashAttributeFilterComponents.get(key).instance.onFiltersUpdated.unsubscribe();
      this.attributeContainer.viewContainerRef.remove(key);

      this.hashAttributeFilterComponents.delete(key);
  }

  private findAttributeFilterUsable(category: Category): Array<AttributeType>{
    // let typeIdsInUse: Array<number> = this.filteringService.getInUseAttributeTypeIds(); 
    let typeIdsInUse: Array<number> = []; 
    let highestDisplay: number = 500000;
    let zeroDisplayInUse: boolean = false;

    this.hashAttributeFilterComponents.forEach(comp => {
      typeIdsInUse.push(comp.instance.selectedTypeId);
    });
    for (let id of typeIdsInUse){
      let display: number = category.attributeTypes.find(att => att.typeId == id).displayOrder;
      zeroDisplayInUse = zeroDisplayInUse || (display === 0);
      if (display !== 0 
          && display < highestDisplay){
        highestDisplay = display;
      }
    }

    let attributeSubSet: Array<AttributeType> = [];
    if (!zeroDisplayInUse){
      let attr0: AttributeType = category.attributeTypes.find(att => att.displayOrder == 0);
      if (attr0){
        attributeSubSet.push(attr0);
      }
    }

    for(let attr of category.attributeTypes){
      if (attr.displayOrder > highestDisplay){
        attributeSubSet.push(attr);
      }
    }

    return attributeSubSet;
  }
}
