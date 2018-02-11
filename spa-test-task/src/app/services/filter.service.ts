import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/of";
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable()
export class FilterService {

  constructor(private http: HttpClient,
              private userService: UserService) { }

  public getCategories(): Observable<Array<Category>> {
    let dummyCats: Array<Category> = [];

    let dummy: Category = new Category();
    dummy.name = "dummy";
    dummyCats.push(dummy)

    return Observable.of(dummyCats);
  }

}
