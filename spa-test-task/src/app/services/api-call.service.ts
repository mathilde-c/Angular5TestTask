import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiCallService {

  private baseUrl: string = "http://incontrolpty.australiaeast.cloudapp.azure.com:7123/WebServices/api/";

  constructor(private http: HttpClient) { }

  public makePostCall<T>(endpoint: string, body: any): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":  "application/json",
        "Accept": "application/json"
      })};

    return this.http.post<T>(this.baseUrl + endpoint, body, httpOptions);
  }

}
