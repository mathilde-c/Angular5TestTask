import { TestBed, inject } from "@angular/core/testing";

import { BaseUriInterceptor } from "./base-uri-interceptor.service";

describe("BaseUriInterceptorService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseUriInterceptor]
    });
  });

  it("should be created", inject([BaseUriInterceptor], (service: BaseUriInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
