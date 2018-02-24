import { TestBed, inject } from "@angular/core/testing";

import { HeaderInterceptor } from "./header-interceptor.service";

describe("HeaderInterceptorService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderInterceptor]
    });
  });

  it("should be created", inject([HeaderInterceptor], (service: HeaderInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
