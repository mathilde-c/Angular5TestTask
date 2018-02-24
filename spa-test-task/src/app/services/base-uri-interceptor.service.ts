import { Injectable } from "@angular/core";
import {  HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { environment } from "../../environments/environment";

@Injectable()
export class BaseUriInterceptor  implements HttpInterceptor {

  private baseUrl: string = environment.apiUrl;

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `${this.baseUrl}/${req.url}` });
    return next.handle(apiReq);
  }

}
