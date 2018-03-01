import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { CategoryFilterComponent } from "./category-filter.component";
import { ClearFilterComponent } from "../clear-filter/clear-filter.component";
import { CategoryService } from "../../services/category.service";
import { IfObservable } from "rxjs/observable/IfObservable";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { FilterService } from "../../services/filter.service";
import { IItemCompletedAuditSearchResult } from "../../models/item-completed-audit-search-result";
import { ComponentFactoryResolver } from "@angular/core";
import { ICategory } from "../../models/category";
import { SelectedAttributeFilter } from "../../models/selected-attribute-filter";
import { DatesFilter } from "../../models/dates-filter";

describe("CategoryFilterComponent", () => {
    let component: CategoryFilterComponent;
    let fixture: ComponentFixture<CategoryFilterComponent>;

    const categoryServiceStub: Partial<CategoryService> = {
        getCategories: () => Observable.of([])
    };
    const filterServiceStub: Partial<FilterService> = {
        upToDateSearchResults: new BehaviorSubject<Array<IItemCompletedAuditSearchResult>>([]),
        upToDateSearchResultsTitle: new BehaviorSubject<string>(""),
        setCategory: (category: ICategory) => { },
        setAttributesFilters: (filters: Array<SelectedAttributeFilter>) => { },
        setDates: (dates: DatesFilter) => { },
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CategoryFilterComponent,
                ClearFilterComponent,
            ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
            ],
            providers: [
                { provide: CategoryService, useValue: categoryServiceStub },
                { provide: FilterService, useValue: filterServiceStub },
                ComponentFactoryResolver
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        document.body.removeChild(fixture.debugElement.nativeElement);
        fixture.destroy();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });

    //#region UI
    it("should contain <app-clear-filter> component, when some hasAttributeFilters are selected", () => {
        const spy = spyOn(component, "hasAttributeFilters").and.returnValue(true);
        fixture.detectChanges();

        const categoryFilterElement = fixture.debugElement.nativeElement;

        expect(categoryFilterElement.querySelector("app-clear-filter")).toBeTruthy();
    });

    it("should contain <app-clear-filter> component, when some hasAttributeFilters are selected", () => {
        const spy = spyOn(component, "hasAttributeFilters").and.returnValue(true);
        fixture.detectChanges();

        const categoryFilterElement = fixture.debugElement.nativeElement;

        expect(categoryFilterElement.querySelector("app-clear-filter")).toBeTruthy();
    });
    //#endregion

    //#region behavior
    //#endregion

});
