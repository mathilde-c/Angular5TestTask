import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatTooltipModule, MatTableModule, MatPaginatorModule } from "@angular/material";
import { MockComponent } from "ng2-mock-component/index";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { SearchResultComponent } from "./search-result.component";
import { FilterService } from "../../services/filter.service";
import { IItemCompletedAuditSearchResult } from "../../models/item-completed-audit-search-result";
import { AngularWaitBarrier } from "blocking-proxy/built/lib/angular_wait_barrier";

describe("SearchResultComponent", () => {
    let component: SearchResultComponent;
    let fixture: ComponentFixture<SearchResultComponent>;

    const filterServiceStub: Partial<FilterService> = {
        upToDateSearchResults: new BehaviorSubject<Array<IItemCompletedAuditSearchResult>>([]),
        upToDateSearchResultsTitle: new BehaviorSubject<string>("")
    };

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                SearchResultComponent,
                MockComponent({ selector: "app-contrast-bar-graph", inputs: ["pass", "fail"] }),
            ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
                MatTooltipModule,
                MatTableModule,
                MatPaginatorModule,
            ],
            providers: [{ provide: FilterService, useValue: filterServiceStub }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultComponent);
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

    it("should update its title when filterService title get updated", () => {
        const service: FilterService = TestBed.get(FilterService);
        service.upToDateSearchResultsTitle.next("new title");

        expect(component.resultTypeTitle).toEqual("new title");
    });

    it("should update its result list when filterService results get retrived", () => {
        const service: FilterService = TestBed.get(FilterService);
        service.upToDateSearchResults.next([
            {
                FailedAuditCount: 3,
                CompletedAuditCount: 6,
                PassedAuditCount: 3,
                getId: () => 1,
                getName: () => "name",
                setId: null,
                setName: null
            }
        ]);

        expect(component.dataSource.data.length).toEqual(1);
    });

    it("should constain <app-contrast-bar-graph> when its result list is not empty", () => {
        const service: FilterService = TestBed.get(FilterService);
        service.upToDateSearchResults.next([
            {
                FailedAuditCount: 3,
                CompletedAuditCount: 6,
                PassedAuditCount: 3,
                getId: () => 1,
                getName: () => "name",
                setId: null,
                setName: null
            }
        ]);

        const searchResultsElement = fixture.debugElement.nativeElement;
        fixture.detectChanges();

        expect(searchResultsElement.querySelector("app-contrast-bar-graph")).toBeTruthy();
    });
});
