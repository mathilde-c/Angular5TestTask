import { TestBed, inject } from '@angular/core/testing';

import { BaseUriInterceptorService } from './base-uri-interceptor.service';

describe('BaseUriInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseUriInterceptorService]
    });
  });

  it('should be created', inject([BaseUriInterceptorService], (service: BaseUriInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
