import { Component, OnInit, OnDestroy, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef, Input } from "@angular/core";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";

import { CategoryService } from "../../services/category.service";
import { FilterService } from "../../services/filter.service";
import { AttributesFilterContainerDirective } from "../../tools/attributes-filter-container.directive";
import { SelectedAttributeFilter } from "../../models/selected-attribute-filter";
import { ICategory } from "../../models/category";
import { CategoryAttributeFilterComponent } from "../category-attribute-filter/category-attribute-filter.component";
import { AttributeType } from "../../models/attribute-type";
import { AttributeValue } from "../../models/attribute-value";
import { AttributeCompletedAuditSearchResultList } from "../../models/attribute-completed-audit-search-result-list";
import { IItemCompletedAuditSearchResultList } from "../../models/item-completed-audit-search-result-list";
import { AttributeCompletedAuditSearchResult } from "../../models/attribute-completed-audit-search-result";
import { IItemCompletedAuditSearchResult } from "../../models/item-completed-audit-search-result";

@Component({
    selector: "app-category-filter",
    templateUrl: "./category-filter.component.html",
    styleUrls: ["./category-filter.component.css"]
})
export class CategoryFilterComponent implements OnInit, OnDestroy {
    @Input() public stopSearch: Subject<boolean>;
    @ViewChild(AttributesFilterContainerDirective) public attributeContainer: AttributesFilterContainerDirective;

    public categoryList: Array<ICategory> = [];
    private allCategoriesCat: ICategory;
    public get selectedCategory(): ICategory { return this.selectedCategoryValue; }
    public set selectedCategory(val) {
        this.selectedCategoryValue = val;
        this.filteringService.setCategory(val);
    }

    private selectedCategoryValue: ICategory;

    private hashAttributeFilterComponents = new Map<number, ComponentRef<CategoryAttributeFilterComponent>>();

    private unsuscribeAll: Subject<boolean> = new Subject<boolean>();

    constructor(private filteringService: FilterService,
        private categoryService: CategoryService,
        private componentFactoryResolver: ComponentFactoryResolver) { }


    public ngOnInit(): void {
        this.initializeAllCategoriesCat();
        this.InitializeCategories();

        this.selectedCategory = this.allCategoriesCat;
    }
    public ngOnDestroy(): void {
        this.unsuscribeAll.next(true);
        this.unsuscribeAll.unsubscribe();
    }

    private InitializeCategories(): void {
        this.categoryList.push(this.allCategoriesCat);

        const listOfCategoryFomServer: Array<ICategory> = [];
        this.categoryService.getCategories()
            .takeUntil(this.unsuscribeAll)
            .subscribe(
                (resultArray: Array<ICategory>) => {
                    const resultFromackEnd: Array<ICategory> = resultArray.map(c => { const cat: ICategory = c; return cat; });
                    this.categoryList = this.categoryList.concat(resultFromackEnd);
                }
            );
    }

    private initializeAllCategoriesCat(): void {
        this.allCategoriesCat = {
            AttributeTypes: [],
            CategoryId: null,
            DefaultTypeId: null,
            DemeritStartingScore: 0,
            Name: "All categories"
        };
    }

    public onCategoryChange(newCategory: ICategory): void {
        this.stopSearch.next(true);

        this.clearAttributeFilterComponents();

        if (newCategory
            && newCategory.CategoryId) {
            this.setSelectedAttribute(newCategory.DefaultTypeId, newCategory, null);
        }

        this.startSearch();
    }

    private clearAttributeFilterComponents(): void {
        const numberOfComponent: number = this.hashAttributeFilterComponents.size;
        for (let i: number = 0; i < numberOfComponent; i++) {
            this.removeAttributeFilterComponent(i);
        }

        this.hashAttributeFilterComponents.clear();
    }

    private setSelectedAttribute(attributeTypeId: number
        , category: ICategory
        , attributeValueId: number
        , idOfAttributeComponent: number = null): void {

        if (!category) {
            category = this.selectedCategory;
        }

        if (idOfAttributeComponent != null) {
            for (let i: number = this.hashAttributeFilterComponents.size - 1; i > idOfAttributeComponent; i--) {
                this.removeAttributeFilterComponent(i);
            }

            if (attributeValueId != null) {
                // trigger create of new level of filtering (new component)
                this.createAttributeFilterComponent(null, this.hashAttributeFilterComponents.size, category);
            } else {
                // reinitialize the attributesValues for component
                const comp: ComponentRef<CategoryAttributeFilterComponent> = this.hashAttributeFilterComponents.get(idOfAttributeComponent);
                comp.instance.attributeValuesList = this.initializeDefaultAttributValues();
            }
        } else {
            this.createAttributeFilterComponent(attributeTypeId, this.hashAttributeFilterComponents.size, category);
        }

        this.updatefilteringServiceAttributeFilters();
    }

    private createAttributeFilterComponent(attributeTypeId: number, index: number, category: ICategory)
        : ComponentRef<CategoryAttributeFilterComponent> {
        const remainingAttributeTypeFilterUnused = this.getAttributeTypeList(category);

        if (remainingAttributeTypeFilterUnused.length === 0) {
            return;
        }

        if (attributeTypeId == null) {
            attributeTypeId = remainingAttributeTypeFilterUnused[0].TypeId;
        }

        const categoryAttributeFilterComponent = this.componentFactoryResolver.resolveComponentFactory(CategoryAttributeFilterComponent);
        const compRef: ComponentRef<CategoryAttributeFilterComponent> =
            this.attributeContainer.viewContainerRef.createComponent(categoryAttributeFilterComponent);

        compRef.instance.defaultSelectedAttributeTypeId = attributeTypeId;
        compRef.instance.id = index;
        compRef.instance.onFiltersUpdated.subscribe(
            (selectedAttribute: SelectedAttributeFilter) => {
                this.setSelectedAttribute(selectedAttribute.TypeId,
                    null,
                    selectedAttribute.AttributeId,
                    selectedAttribute.AttributeFilterId);
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
        const attrValues: Array<AttributeValue> = [];

        const all: AttributeValue = new AttributeValue();

        all.AttributeId = null;
        all.AttributeName = "All";
        all.Id = -1;
        attrValues.push(all);

        return attrValues;
    }

    private removeAttributeFilterComponent(key: number): void {
        this.attributeContainer.viewContainerRef.remove(key);

        this.hashAttributeFilterComponents.delete(key);

        this.updatefilteringServiceAttributeFilters();
    }

    private findAttributeFilterUsable(category: ICategory): Array<AttributeType> {
        const typeIdsInUse: Array<number> = [];
        let highestDisplay: number = -1;
        let zeroDisplayInUse: boolean = false;

        this.hashAttributeFilterComponents.forEach(comp => {
            typeIdsInUse.push(comp.instance.selectedTypeId);
        });

        if (typeIdsInUse.length === category.AttributeTypes.length) {
            return [];
        }

        // tslint:disable-next-line:prefer-const
        for (let id of typeIdsInUse) {
            const display: number = category.AttributeTypes.find(att => att.TypeId === id).DisplayOrder;
            zeroDisplayInUse = zeroDisplayInUse || (display === 0);
            if (display > highestDisplay) {
                highestDisplay = display;
            }
        }

        if (zeroDisplayInUse) {
            return [];
        }

        const attributeSubSet: Array<AttributeType> = [];
        if (!zeroDisplayInUse) {
            const attr0: AttributeType = category.AttributeTypes.find(att => att.DisplayOrder === 0);
            if (attr0) {
                attributeSubSet.push(attr0);
            }
        }

        // tslint:disable-next-line:prefer-const
        for (let attr of category.AttributeTypes) {
            if (attr.DisplayOrder > highestDisplay) {
                attributeSubSet.push(attr);
            }
        }

        return attributeSubSet;
    }

    private startSearch(): void {
        this.filteringService.searchCompletedAudits(this.stopSearch)
            .takeUntil(this.stopSearch)
            .subscribe(
                (resultList: IItemCompletedAuditSearchResultList) => {
                    if (resultList
                        && resultList.getItems().length > 0
                        && this.selectedCategory != null) {
                        const latestAttributeFilter = this.retriveLatestAttributeFilter();

                        if (latestAttributeFilter != null
                            && !this.areLatestAttributeFilterValuesSetFromServer(latestAttributeFilter)) {
                            this.updateLatestAttributeFilterValuesSetFromServer(latestAttributeFilter, resultList.getItems());
                        }
                    }
                }
            );
    }

    private retriveLatestAttributeFilter(): ComponentRef<CategoryAttributeFilterComponent> {
        if (this.hashAttributeFilterComponents.size === 0) {
            return null;
        }

        let highestIndex = -1;
        this.hashAttributeFilterComponents.forEach((comp, key) => {
            if (key > highestIndex) {
                highestIndex = key;
            }
        });

        return this.hashAttributeFilterComponents.get(highestIndex);
    }

    private areLatestAttributeFilterValuesSetFromServer(latestAttributeFilter: ComponentRef<CategoryAttributeFilterComponent>): boolean {
        return latestAttributeFilter.instance.attributeValuesList.length > 1;
    }
    private updateLatestAttributeFilterValuesSetFromServer(latestAttributeFilter: ComponentRef<CategoryAttributeFilterComponent>
        , results: Array<IItemCompletedAuditSearchResult>): void {
        results.forEach(result => {
            const attr: AttributeValue = new AttributeValue();
            attr.AttributeId = result.getId();
            attr.AttributeName = result.getName();

            latestAttributeFilter.instance.attributeValuesList.push(attr);
        });
    }

    public hasAttributeFilters(): boolean {
        return (this.hashAttributeFilterComponents.size > 0);
    }

    public clearLastAttributeFilter(): void {
        const beforeLastAttributeFilterIndex = (this.hashAttributeFilterComponents.size - 1) - 1;

        if (beforeLastAttributeFilterIndex >= 0) {
            const comp = this.hashAttributeFilterComponents.get(beforeLastAttributeFilterIndex);

            comp.instance.selectedValueId = null;
        } else {
            this.selectedCategory = this.allCategoriesCat;
            this.clearAttributeFilterComponents();
        }

        this.startSearch();
    }

    private updatefilteringServiceAttributeFilters(): void {
        const attrFilters: Array<SelectedAttributeFilter> = [];
        this.hashAttributeFilterComponents.forEach((comp, key) => {
            const selectedAttribute: SelectedAttributeFilter =
                new SelectedAttributeFilter(key,
                    comp.instance.selectedTypeId,
                    comp.instance.selectedValueId,
                    comp.instance.selectedTypeName);
            attrFilters.push(selectedAttribute);
        });

        this.filteringService.setAttributesFilters(attrFilters);
    }

    private triggerNewAttributeFilterComponentInitialization(compRef: ComponentRef<CategoryAttributeFilterComponent>): void {
        compRef.instance.ngOnInit();
    }

    private getAttributeTypeList(category: ICategory): Array<AttributeType> {
        return this.hashAttributeFilterComponents.size > 0
            ? this.findAttributeFilterUsable(category)
            : category.AttributeTypes;
    }
}

