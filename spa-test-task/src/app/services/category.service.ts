import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/of";

import { UserService } from './user.service';
import { Category } from '../models/category';
import { AttributeType } from '../models/attribute-type';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient,
    private userService: UserService) { }

    public getCategories(): Observable<Array<Category>> {
      let attributeTypesList: Array<AttributeType> = [];
      let at: AttributeType = new AttributeType();
      at.typeId = 1;
      at.displayOrder = 0;
      at.name = "at1";
      attributeTypesList.push(at);
      at = new AttributeType();
      at.typeId = 2;
      at.displayOrder = 1;
      at.name = "at2";
      attributeTypesList.push(at);


      let dummyCats: Array<Category> = [];

      let dummy: Category = new Category();
      dummy.name = "dummy";
      dummy.categoryId = 1;
      dummy.defaultTypeId =2;
      dummy.attributeTypes = attributeTypesList;
      dummyCats.push(dummy);
      dummy = new Category();
      dummy.name = "dummy2";
      dummy.categoryId = 2;
      dummy.defaultTypeId = 2;
      dummy.attributeTypes = attributeTypesList;
      dummyCats.push(dummy)

      return Observable.of(dummyCats);
    }

}
