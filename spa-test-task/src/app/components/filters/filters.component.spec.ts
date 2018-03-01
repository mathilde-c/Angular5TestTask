import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MockComponent } from "ng2-mock-component/index";

import { FiltersComponent } from "./filters.component";
import { FilterService } from "../../services/filter.service";
import { DatesFilter } from "../../models/dates-filter";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { IItemCompletedAuditSearchResultList } from "../../models/item-completed-audit-search-result-list";

describe("FiltersComponent", () => {
    let component: FiltersComponent;
    let fixture: ComponentFixture<FiltersComponent>;

    beforeEach(async(() => {

        const ihh: IItemCompletedAuditSearchResultList = {
            TotalAuditCount: 3,
            TotalFailedAuditCount: 1,
            TotalPassedAuditCount: 2,
            getItems: () => []
        };
        const filterServiceStub: Partial<FilterService> = {
            setDates: (updatedDateFilter: DatesFilter) => { },
            searchCompletedAudits: (stopSearch: Subject<boolean>) => Observable.of(<IItemCompletedAuditSearchResultList>{
                TotalAuditCount: 3,
                TotalFailedAuditCount: 1,
                TotalPassedAuditCount: 2,
                getItems: () => []
            }),
        };

        TestBed.configureTestingModule({
            declarations: [
                FiltersComponent,
                MockComponent({ selector: "app-dates-filter", outputs: ["notifyDatesChanges"] }),
                MockComponent({ selector: "app-category-filter", inputs: ["stopSearch"] }),
            ],
            providers: [{ provide: FilterService, useValue: filterServiceStub }]
        })
            .compileComponents();
    }));

    afterEach(() => {
        document.body.removeChild(fixture.debugElement.nativeElement);
        fixture.destroy();
    });

    it("should be created", () => {
        fixture = TestBed.createComponent(FiltersComponent);
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it("should constain <app-dates-filter>", () => {
        fixture = TestBed.createComponent(FiltersComponent);
        const filterElement = fixture.debugElement.nativeElement;
        expect(filterElement.querySelector("app-dates-filter")).toBeTruthy();
    });

    it("should constain <app-category-filter>", () => {
        fixture = TestBed.createComponent(FiltersComponent);
        const filterElement = fixture.debugElement.nativeElement;
        expect(filterElement.querySelector("app-category-filter")).toBeTruthy();
    });

    it("should stop the ongoing search, when date filter changes", () => {
        fixture = TestBed.createComponent(FiltersComponent);
        component = fixture.componentInstance;
        const spy = spyOn(component.stopSearch, "next");

        const newDates: DatesFilter = new DatesFilter(3, 5);
        component.updateDateChange(newDates);

        expect(spy.calls.count()).toEqual(1);
    });

    it("should updateDates in filterService, when date filter changes", () => {
        fixture = TestBed.createComponent(FiltersComponent);
        component = fixture.componentInstance;
        const filterServiceStub = TestBed.get(FilterService);
        const spy = spyOn(filterServiceStub, "setDates");

        const newDates: DatesFilter = new DatesFilter(3, 5);
        component.updateDateChange(newDates);

        expect(spy.calls.count()).toEqual(1);
    });

    it("should trigger new search, when date filter changes", () => {

        fixture = TestBed.createComponent(FiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        const filterServiceStub = TestBed.get(FilterService);
        const spy = spyOn(filterServiceStub, "searchCompletedAudits")
            .and.returnValue(Observable.of(<IItemCompletedAuditSearchResultList>{
                TotalAuditCount: 3,
                TotalFailedAuditCount: 1,
                TotalPassedAuditCount: 2,
                getItems: () => []
            }));

        const newDates: DatesFilter = new DatesFilter(3, 5);
        component.updateDateChange(newDates);

        expect(spy.calls.count()).toEqual(1);
    });
});
