import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClientModule, HttpRequest } from "@angular/common/http";

import { FilterService } from "./filter.service";
import { UserService } from "./user.service";
import { Subject } from "rxjs/Subject";
import { CategoriesCompletedAuditListRequestPayload } from "../models/categories-completed-audit-list-request-payload";
import { DatesFilter } from "../models/dates-filter";
import { ICategory } from "../models/category";
import { AttributeCompletedAuditListRequestPayload } from "../models/attribute-completed-audit-list-request-payload";
import { AttributeType } from "../models/attribute-type";
import { SelectedAttributeFilter } from "../models/selected-attribute-filter";

describe("FilterService", () => {

    let userServiceStub: Partial<UserService>;
    userServiceStub = {
        getUserId: () => 0,
    };

    let dateFilter: DatesFilter;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ],
            providers: [
                FilterService,
                { provide: UserService, useValue: userServiceStub },
            ]
        });

        dateFilter = new DatesFilter(3000, 5000);
        TestBed.get(FilterService).setDates(dateFilter);

    });

    afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
        backend.verify();
    }));

    it("should be created", inject([FilterService], (service: FilterService) => {
        expect(service).toBeTruthy();
    }));

    it("should send POST request to retrive ALL Audit Results for all categories from back-end,"
        + " when searchCompletedAudits with no currentCategory ",
        async(
            inject([FilterService, HttpTestingController], (service: FilterService, backend: HttpTestingController) => {
                const stopSearch: Subject<boolean> = new Subject<boolean>();
                service.searchCompletedAudits(stopSearch).subscribe();

                backend.expectOne((req: HttpRequest<any>) => {
                    const expectedBody: CategoriesCompletedAuditListRequestPayload = new CategoriesCompletedAuditListRequestPayload();
                    expectedBody.UserId = TestBed.get(UserService).getUserId();
                    expectedBody.StartMillis = dateFilter.fromMilliSec;
                    expectedBody.EndMillis = dateFilter.toMilliSec;

                    const actualBody: CategoriesCompletedAuditListRequestPayload = req.body;

                    return req.url === "CategoryCompletedAudits"
                        && req.method === "POST"
                        && expectedBody.isEqual(actualBody);
                });
            })
        )
    );

    it("should send POST request to retrive ALL Audit Results for all categories from back-end,"
        + " when searchCompletedAudits with currentCategory has no Id ",
        async(
            inject([FilterService, HttpTestingController], (service: FilterService, backend: HttpTestingController) => {
                service.setCategory(<ICategory>{
                    CategoryId: undefined,
                    AttributeTypes: null,
                    Name: null,
                    DefaultTypeId: null,
                    DemeritStartingScore: null,
                });
                const stopSearch: Subject<boolean> = new Subject<boolean>();
                service.searchCompletedAudits(stopSearch).subscribe();

                backend.expectOne((req: HttpRequest<any>) => {
                    const expectedBody: CategoriesCompletedAuditListRequestPayload = new CategoriesCompletedAuditListRequestPayload();
                    expectedBody.UserId = TestBed.get(UserService).getUserId();
                    expectedBody.StartMillis = dateFilter.fromMilliSec;
                    expectedBody.EndMillis = dateFilter.toMilliSec;

                    const actualBody: CategoriesCompletedAuditListRequestPayload = req.body;

                    return req.url === "CategoryCompletedAudits"
                        && req.method === "POST"
                        && expectedBody.isEqual(actualBody);
                });
            })
        )
    );

    it("should send POST request to retrive Audit Results for a specific category from back-end,"
        + " when searchCompletedAudits with currentCategory has a valid Id ",
        async(
            inject([FilterService, HttpTestingController], (service: FilterService, backend: HttpTestingController) => {
                const attributes: Array<AttributeType> = new Array<AttributeType>(
                    new AttributeType()
                );
                const category: ICategory = <ICategory>{
                    CategoryId: 1,
                    AttributeTypes: null,
                    Name: null,
                    DefaultTypeId: null,
                    DemeritStartingScore: null,
                };
                service.setCategory(category);
                const selectedFilters: Array<SelectedAttributeFilter> = new Array<SelectedAttributeFilter>(
                    new SelectedAttributeFilter(0, 1, null, "name")
                );
                service.setAttributesFilters(selectedFilters);
                const stopSearch: Subject<boolean> = new Subject<boolean>();
                service.searchCompletedAudits(stopSearch).subscribe();

                backend.expectOne((req: HttpRequest<any>) => {

                    return req.url === "CompletedAudits"
                        && req.method === "POST";
                });
            })
        )
    );

    it("should be grouped by the last filtering attribute on the POST request sent to retrive Audit Results for a specific category,"
        + " when searchCompletedAudits with currentCategory has a valid Id ",
        async(
            inject([FilterService, HttpTestingController], (service: FilterService, backend: HttpTestingController) => {
                const attributeFilter: SelectedAttributeFilter = new SelectedAttributeFilter(0, 1, null, "attribute filter name");
                const selectedFilters: Array<SelectedAttributeFilter> = new Array<SelectedAttributeFilter>(attributeFilter);
                service.setAttributesFilters(selectedFilters);

                const category: ICategory = <ICategory>{
                    CategoryId: 1,
                    AttributeTypes: null,
                    Name: null,
                    DefaultTypeId: null,
                    DemeritStartingScore: null,
                };
                service.setCategory(category);

                const stopSearch: Subject<boolean> = new Subject<boolean>();
                service.searchCompletedAudits(stopSearch).subscribe();

                backend.expectOne((req: HttpRequest<any>) => {

                    const actualBody: AttributeCompletedAuditListRequestPayload = req.body;

                    return req.url === "CompletedAudits"
                        && req.method === "POST"
                        && actualBody.GroupByAttributeTypeId === selectedFilters[selectedFilters.length - 1].TypeId;
                });
            })
        )
    );

    it("should set filtering based on current for the POST request sent to retrive Audit Results for a specific category,"
        + " when searchCompletedAudits with currentCategory has a valid Id ",
        async(
            inject([FilterService, HttpTestingController], (service: FilterService, backend: HttpTestingController) => {
                const attributeFilter1: SelectedAttributeFilter = new SelectedAttributeFilter(0, 2, 24, "attribute filter name");
                const attributeFilter2: SelectedAttributeFilter = new SelectedAttributeFilter(0, 4, null, "attribute filter name");
                const selectedFilters: Array<SelectedAttributeFilter> = new Array<SelectedAttributeFilter>(
                    attributeFilter1,
                    attributeFilter2,
                );
                service.setAttributesFilters(selectedFilters);

                const category: ICategory = <ICategory>{
                    CategoryId: 1,
                    AttributeTypes: null,
                    Name: null,
                    DefaultTypeId: null,
                    DemeritStartingScore: null,
                };
                service.setCategory(category);

                const stopSearch: Subject<boolean> = new Subject<boolean>();
                service.searchCompletedAudits(stopSearch).subscribe();

                backend.expectOne((req: HttpRequest<any>) => {

                    const actualBody: AttributeCompletedAuditListRequestPayload = req.body;
                    let allAttributesUsedForFiltering: boolean = true;

                    selectedFilters.forEach(filter => {
                        if (filter.AttributeId) {
                            allAttributesUsedForFiltering = allAttributesUsedForFiltering
                                && (actualBody.SelectedAttributes.findIndex(attr => attr.AttributeId === filter.AttributeId
                                    && attr.TypeId === filter.TypeId) > -1);
                        }
                    });

                    return req.url === "CompletedAudits"
                        && req.method === "POST"
                        && allAttributesUsedForFiltering;
                });
            })
        )
    );

    it("should be created", inject([FilterService], (service: FilterService) => {
        expect(service).toBeTruthy();
    }));
});
