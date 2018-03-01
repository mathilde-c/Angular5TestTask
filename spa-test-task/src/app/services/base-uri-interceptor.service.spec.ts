import { TestBed, inject } from "@angular/core/testing";
import { BaseUriInterceptor } from "./base-uri-interceptor.service";
import { HttpEvent, HttpRequest, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { environment } from "../../environments/environment";

describe("BaseUriInterceptorService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BaseUriInterceptor]
        });
    });

    it("should be created", inject([BaseUriInterceptor], (service: BaseUriInterceptor) => {
        expect(service).toBeTruthy();
    }));

    it("should prefix the request url with uri provided in the environment",
        inject([BaseUriInterceptor], (service: BaseUriInterceptor) => {
            const request: HttpRequest<any> = new HttpRequest("GET", "url");
            const handler: HttpHandler = {
                handle: (r: HttpRequest<any>) => {
                    const urlStartWithEnviUri = r.url.startsWith(`${environment.apiUrl}`);
                    expect(urlStartWithEnviUri).toBeTruthy();

                    return new Observable<HttpEvent<any>>();
                }
            };

            service.intercept(request, handler);
        })
    );
});
