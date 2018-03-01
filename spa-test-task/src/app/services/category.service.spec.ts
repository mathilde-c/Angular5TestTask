import { TestBed, async, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClientModule, HttpRequest, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { CategoryService } from "./category.service";
import { UserService } from "./user.service";
import { ICategory } from "../models/category";
import { CategoriesListRequestPayload } from "../models/categories-list-request-payload";

describe("CategoryService", () => {

    let userServiceStub: Partial<UserService>;
    userServiceStub = {
        getUserId: () => 0,
    };

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ],
            providers: [
                CategoryService,
                { provide: UserService, useValue: userServiceStub },
            ]
        });
    });

    afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
        backend.verify();
    }));

    it("should be created", inject([CategoryService], (service: CategoryService) => {
        expect(service).toBeTruthy();
    }));

    it(`should send POST with UserId request to retrive categories from back-end`,
        async(
            inject([CategoryService, HttpTestingController], (service: CategoryService, backend: HttpTestingController) => {
                service.getCategories().subscribe();

                backend.expectOne((req: HttpRequest<any>) => {
                    const expectedBody: CategoriesListRequestPayload = new CategoriesListRequestPayload();
                    expectedBody.UserId = TestBed.get(UserService).getUserId();
                    expectedBody.LoadAttributes = true;
                    expectedBody.CategoryId = 0;

                    const actualBody: CategoriesListRequestPayload = req.body;

                    return req.url === "Category"
                        && req.method === "POST"

                        && expectedBody.isEqual(actualBody);
                });

            })
        )
    );
});
