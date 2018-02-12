import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { CategoryService } from '../../services/category.service';
import { FilterService } from '../../services/filter.service';
import { AttributesFilterContainerDirective } from '../../tools/attributes-filter-container.directive';
import { SelectedAttributeFilter } from '../../models/selected-attribute-filter' ;
import { Category } from '../../models/category';
import { CategoryAttributeFilterComponent } from '../category-attribute-filter/category-attribute-filter.component';
import { AttributeType } from '../../models/attribute-type';
import { AttributeValue } from '../../models/attribute-value';
import { AttributeCompletedAuditSearchResultList } from '../../models/attribute-completed-audit-search-result-list';
import { ItemCompletedAuditSearchResultList } from '../../models/item-completed-audit-search-result-list';
import { AttributeCompletedAuditSearchResult } from '../../models/attribute-completed-audit-search-result';
import { ItemCompletedAuditSearchResult } from '../../models/item-completed-audit-search-result';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit, OnDestroy {
  @Input() stopSearch: Subject<boolean>;
  @ViewChild(AttributesFilterContainerDirective) attributeContainer: AttributesFilterContainerDirective;

  public categoryList: Array<Category> = [];
  private allCategoriesCat: Category;
  public get selectedCategory() { return this.selectedCategoryValue; }
  public set selectedCategory(val) { 
    this.selectedCategoryValue = val;
    this.filteringService.setCategory(val); 
  }
  
  private selectedCategoryValue: Category;

  private hashAttributeFilterComponents = new Map<number, ComponentRef<CategoryAttributeFilterComponent>>(); 

  private unsuscribeAll: Subject<boolean> = new Subject<boolean>();

  constructor(private filteringService: FilterService,
              private categoryService: CategoryService,
              private componentFactoryResolver: ComponentFactoryResolver) 
  { }


  ngOnInit() {
    this.initializeAllCategoriesCat();
    this.InitializeCategories();

    this.selectedCategory = this.allCategoriesCat;
  }
  ngOnDestroy(): void {
    this.unsuscribeAll.next(true);
    this.unsuscribeAll.unsubscribe();
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
        }
      );
  }

  private initializeAllCategoriesCat() {
      this.allCategoriesCat = {
        AttributeTypes: [],
        CategoryId: null,
        DefaultTypeId: null,
        DemeritStartingScore: 0,
        Name: "All categories"
      };
  }

  public onCategoryChange(newCategory: Category): void {
    this.stopSearch.next(true);

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

      if (attributeValueId != null){
        // trigger create of new level of filtering (new component)
        this.createAttributeFilterComponent(null, this.hashAttributeFilterComponents.size, category);
      } else{
        // reinitialize the attributesValues for component 
        let comp: ComponentRef<CategoryAttributeFilterComponent> = this.hashAttributeFilterComponents.get(idOfAttributeComponent);
        comp.instance.attributeValuesList = this.initializeDefaultAttributValues();
      }
    } else {
      this.createAttributeFilterComponent(attributeTypeId, this.hashAttributeFilterComponents.size, category);
    }

    this.updatefilteringServiceAttributeFilters();
  }

  private createAttributeFilterComponent(attributeTypeId: number, index: number, category: Category): ComponentRef<CategoryAttributeFilterComponent> {
    let remainingAttributeTypeFilterUnused = this.getAttributeTypeList(category);

    if (remainingAttributeTypeFilterUnused.length === 0) {
      return;
    }

    if (attributeTypeId == null) {
      attributeTypeId = remainingAttributeTypeFilterUnused[0].TypeId;
    }

    let categoryAttributeFilterComponent  = this.componentFactoryResolver.resolveComponentFactory(CategoryAttributeFilterComponent);
    let compRef: ComponentRef<CategoryAttributeFilterComponent> = this.attributeContainer.viewContainerRef.createComponent(categoryAttributeFilterComponent);
    
    compRef.instance.defaultSelectedAttributeTypeId = attributeTypeId;
    compRef.instance.id = index;
    compRef.instance.onFiltersUpdated.subscribe(
      (selectedAttribute: SelectedAttributeFilter) => {
        this.setSelectedAttribute(selectedAttribute.TypeId, null, selectedAttribute.AttributeId, selectedAttribute.AttributeFilterId);
        this.startSearch();
      }
    );

    compRef.instance.attributeTypesList = remainingAttributeTypeFilterUnused;

    compRef.instance.attributeValuesList = this.initializeDefaultAttributValues();

    this.triggerNewAttributeFilterComponentInitialization(compRef);
    this.hashAttributeFilterComponents.set(index, compRef);

    this.updatefilteringServiceAttributeFilters();

    return compRef;
  }

  private initializeDefaultAttributValues(): Array<AttributeValue> {
    let attrValues: Array<AttributeValue> = [];

    let all: AttributeValue = new AttributeValue();

    all.AttributeId = null;
    all.AttributeName = "All";
    all.Id = -1;
    attrValues.push(all);
    
    return attrValues;
  }

  private removeAttributeFilterComponent(key: number):void {
    this.attributeContainer.viewContainerRef.remove(key);

    this.hashAttributeFilterComponents.delete(key);

      this.updatefilteringServiceAttributeFilters();
  }

  private findAttributeFilterUsable(category: Category): Array<AttributeType>{
    let typeIdsInUse: Array<number> = []; 
    let highestDisplay: number = -1;
    let zeroDisplayInUse: boolean = false;

    this.hashAttributeFilterComponents.forEach(comp => {
      typeIdsInUse.push(comp.instance.selectedTypeId);
    });

    if (typeIdsInUse.length === category.AttributeTypes.length) {
      return [];
    }

    for (let id of typeIdsInUse){
      let display: number = category.AttributeTypes.find(att => att.TypeId == id).DisplayOrder;
      zeroDisplayInUse = zeroDisplayInUse || (display === 0);
      if (display > highestDisplay){
        highestDisplay = display;
      }
    }

    if (zeroDisplayInUse) {
      return [];
    }

    let attributeSubSet: Array<AttributeType> = [];
    if (!zeroDisplayInUse){
      let attr0: AttributeType = category.AttributeTypes.find(att => att.DisplayOrder === 0);
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
        (resultList: ItemCompletedAuditSearchResultList) => {
          if (resultList 
            && resultList.getItems().length > 0
            && this.selectedCategory != null){
            let latestAttributeFilter = this.retriveLatestAttributeFilter();

            if (latestAttributeFilter != null
              && !this.areLatestAttributeFilterValuesSetFromServer(latestAttributeFilter)){
              this.updateLatestAttributeFilterValuesSetFromServer(latestAttributeFilter, resultList.getItems());
            }
          }
        }
      );
  }

  private retriveLatestAttributeFilter(): ComponentRef<CategoryAttributeFilterComponent> {
    if (this.hashAttributeFilterComponents.size === 0){
      return null;
    }

    let highestIndex = -1;
    this.hashAttributeFilterComponents.forEach((comp, key) => 
                  { 
                    if (key > highestIndex) 
                    { 
                      highestIndex = key 
                    }});

    return this.hashAttributeFilterComponents.get(highestIndex);
  }

  private areLatestAttributeFilterValuesSetFromServer(latestAttributeFilter: ComponentRef<CategoryAttributeFilterComponent>): boolean {
    return latestAttributeFilter.instance.attributeValuesList.length > 1;
  }
  private updateLatestAttributeFilterValuesSetFromServer(latestAttributeFilter: ComponentRef<CategoryAttributeFilterComponent>
                                                          , results: ItemCompletedAuditSearchResult[]): void {
    results.forEach(result =>
      {
        let attr: AttributeValue = new AttributeValue();
        attr.AttributeId = result.getId();
        attr.AttributeName = result.getName();

        latestAttributeFilter.instance.attributeValuesList.push(attr);
      });
  }

  public hasAttributeFilters(): boolean {
    return (this.hashAttributeFilterComponents.size > 0);
  }

  public clearLastAttributeFilter(): void {
    let beforeLastAttributeFilterIndex = (this.hashAttributeFilterComponents.size - 1) - 1;

    if (beforeLastAttributeFilterIndex >= 0){
      let comp = this.hashAttributeFilterComponents.get(beforeLastAttributeFilterIndex);

      comp.instance.selectedValueId = null;
    } else {
      this.selectedCategory = this.allCategoriesCat;
      this.clearAttributeFilterComponents();
    }
    
    this.startSearch()
  }

  private updatefilteringServiceAttributeFilters() {
    let attrFilters: Array<SelectedAttributeFilter> =[];
    this.hashAttributeFilterComponents.forEach((comp, key) => {
      let selectedAttribute: SelectedAttributeFilter = new SelectedAttributeFilter(key, comp.instance.selectedTypeId, comp.instance.selectedValueId, comp.instance.selectedTypeName);
      attrFilters.push(selectedAttribute);
    });

    this.filteringService.setAttributesFilters(attrFilters);
  }

  private triggerNewAttributeFilterComponentInitialization(compRef: ComponentRef<CategoryAttributeFilterComponent>) {
      compRef.instance.ngOnInit();
  }

  private getAttributeTypeList(category: Category): Array<AttributeType> {
      return this.hashAttributeFilterComponents.size > 0
              ? this.findAttributeFilterUsable(category)
              : category.AttributeTypes;
  }
}

