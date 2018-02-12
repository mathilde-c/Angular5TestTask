import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map';

import { UserService } from './user.service';
import { Category } from '../models/category';
import { AttributeType } from '../models/attribute-type';
import { CategoriesListRequestPayload } from '../models/categories-list-request-payload';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient,
    private userService: UserService) { }

    public getCategories(): Observable<Array<Category>> {

        let body2: any = {
            "userId": 28,
            "categoryId": 0,
            "loadAttributes": true
          };

        let body: CategoriesListRequestPayload = new CategoriesListRequestPayload();
        body.UserId = this.userService.getUserId();
        body.LoadAttributes = true;
        body.CategoryId = 0;

        return this.http.post<Category[]>("Category", body);
    }

}
