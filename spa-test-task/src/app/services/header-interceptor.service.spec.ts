import { TestBed, inject } from "@angular/core/testing";

import { HeaderInterceptor } from "./header-interceptor.service";
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

describe("HeaderInterceptorService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HeaderInterceptor]
        });
    });

    it("should be created", inject([HeaderInterceptor], (service: HeaderInterceptor) => {
        expect(service).toBeTruthy();
    }));

    it("should set the header \"content-type\" header to \"application/json\"",
        inject([HeaderInterceptor], (service: HeaderInterceptor) => {
            const request: HttpRequest<any> = new HttpRequest("GET", "url");
            const handler: HttpHandler = {
                handle: (r: HttpRequest<any>) => {
                    expect(r.headers.get("content-type")).toEqual("application/json");

                    return new Observable<HttpEvent<any>>();
                }
            };

            service.intercept(request, handler);
        })
    );

    it("should set the header \"accept\" header to \"application/json\"",
        inject([HeaderInterceptor], (service: HeaderInterceptor) => {
            const request: HttpRequest<any> = new HttpRequest("GET", "url");
            const handler: HttpHandler = {
                handle: (r: HttpRequest<any>) => {
                    expect(r.headers.get("accept")).toEqual("application/json");

                    return new Observable<HttpEvent<any>>();
                }
            };

            service.intercept(request, handler);
        })
    );
});
