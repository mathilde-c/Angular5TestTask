import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatTooltipModule, MatTableModule, MatPaginatorModule } from "@angular/material";
import { MockComponent } from "ng2-mock-component/index";

import { SearchResultComponent } from "./search-result.component";
import { FilterService } from "../../services/filter.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IItemCompletedAuditSearchResult } from "../../models/item-completed-audit-search-result";

describe("SearchResultComponent", () => {
    let component: SearchResultComponent;
    let fixture: ComponentFixture<SearchResultComponent>;

    beforeEach(async(() => {
        let filterServiceStub: Partial<FilterService>;
        filterServiceStub = {
            upToDateSearchResults: new BehaviorSubject<Array<IItemCompletedAuditSearchResult>>([]),
            upToDateSearchResultsTitle: new BehaviorSubject<string>("")
        };

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

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
