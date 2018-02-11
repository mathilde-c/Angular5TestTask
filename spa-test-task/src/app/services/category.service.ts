import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/of";

import { UserService } from './user.service';
import { Category } from '../models/Category';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient,
    private userService: UserService) { }

    public getCategories(): Observable<Array<Category>> {
      let dummyCats: Array<Category> = [];

      let dummy: Category = new Category();
      dummy.name = "dummy";
      dummy.categoryId = 1;
      dummyCats.push(dummy)

      return Observable.of(dummyCats);
    }

}
