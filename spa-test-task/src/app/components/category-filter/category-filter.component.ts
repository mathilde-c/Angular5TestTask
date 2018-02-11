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
import { AttributeValue } from '../../models/attribute-value';

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
        (resultArray: Array<Category>) => {
          let v:Category[] = resultArray.map(c => { let cat: Category = c; return cat; });
          this.categoryList = this.categoryList.concat(v);
        },
        error => console.log("Error :: " + error)
      );
  }

  private initializeAllCategoriesCat() {
      this.allCategoriesCat.AttributeTypes = [];
      this.allCategoriesCat.CategoryId = null;
      this.allCategoriesCat.DefaultTypeId = null;
      this.allCategoriesCat.Name = "All categories";
  }

  public onCategoryChange(newCategory: Category): void {
    this.stopSearch.next(true);

    this.filteringService.setCategory(newCategory);
    this.clearAttributeFilterComponents();

    if (newCategory
        && newCategory.CategoryId){
      this.setSelectedAttribute(newCategory.DefaultTypeId, newCategory, null);
    } 

      this.startSearch();
  }

  private clearAttributeFilterComponents(): void {
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

    if (idOfAttributeComponent != null){
      for(let i:number = this.hashAttributeFilterComponents.size - 1; i > idOfAttributeComponent; i--)
      {
        this.removeAttributeFilterComponent(i);
      }
      // update the existing component
      if (attributeValueId != null){
        // trigger create of new component
        this.createAttributeFilterComponent(attributeTypeId, this.hashAttributeFilterComponents.size, category);
      }
    } else {
      this.createAttributeFilterComponent(attributeTypeId, this.hashAttributeFilterComponents.size, category);
    }
  }

  private createAttributeFilterComponent(attributeTypeId: number, index: number, category: Category): ComponentRef<CategoryAttributeFilterComponent> {
    let categoryAttributeFilterComponent  = this.componentFactoryResolver.resolveComponentFactory(CategoryAttributeFilterComponent);
    let compRef: ComponentRef<CategoryAttributeFilterComponent> = this.attributeContainer.viewContainerRef.createComponent(categoryAttributeFilterComponent);
    compRef.instance.defaultSelectedAttributeTypeId = attributeTypeId;
    compRef.instance.id = index;
    compRef.instance.onFiltersUpdated.subscribe(
      selectedAttribute => {
        console.log("selected attribute change!! : " + selectedAttribute);
        this.setSelectedAttribute(selectedAttribute.attributeFilterId, null, selectedAttribute.attributeId, selectedAttribute.attributeFilterId);

        // trigger search
      }
    );

    if (this.hashAttributeFilterComponents.size > 0){
      compRef.instance.attributeTypesList = this.findAttributeFilterUsable(category);
    } else {
      compRef.instance.attributeTypesList = category.AttributeTypes;
    }

    compRef.instance.attributeValuesList = this.initializeDefaultAttributValues();

    this.hashAttributeFilterComponents.set(index, compRef);

    return compRef;
  }

  private initializeDefaultAttributValues(): Array<AttributeValue> {
    let all: AttributeValue = new AttributeValue();

    all.AttributeId = null;
    all.AttributeName = "All";
    all.Id = null;

    let attrValues: Array<AttributeValue> = [];
    attrValues.push(all);
    
    return attrValues;
  }

  private removeAttributeFilterComponent(key: number):void {
      this.attributeContainer.viewContainerRef.remove(key);

      this.hashAttributeFilterComponents.delete(key);
  }

  private findAttributeFilterUsable(category: Category): Array<AttributeType>{
    let typeIdsInUse: Array<number> = []; 
    let highestDisplay: number = 500000;
    let zeroDisplayInUse: boolean = false;

    this.hashAttributeFilterComponents.forEach(comp => {
      typeIdsInUse.push(comp.instance.selectedTypeId);
    });
    for (let id of typeIdsInUse){
      let display: number = category.AttributeTypes.find(att => att.TypeId == id).DisplayOrder;
      zeroDisplayInUse = zeroDisplayInUse || (display === 0);
      if (display !== 0 
          && display < highestDisplay){
        highestDisplay = display;
      }
    }

    let attributeSubSet: Array<AttributeType> = [];
    if (!zeroDisplayInUse){
      let attr0: AttributeType = category.AttributeTypes.find(att => att.DisplayOrder == 0);
      if (attr0){
        attributeSubSet.push(attr0);
      }
    }

    for(let attr of category.AttributeTypes){
      if (attr.DisplayOrder > highestDisplay){
        attributeSubSet.push(attr);
      }
    }

    return attributeSubSet;
  }

    private startSearch() {
        this.filteringService.searchCompletedAudits(this.stopSearch)
        .takeUntil(this.stopSearch)
        .subscribe(

        );
    }
}
