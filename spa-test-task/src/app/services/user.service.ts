import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';

@Injectable()
export class UserService {

  constructor(private apiService: ApiCallService) { }

  public getUserId(): number {
      return 28;
  }


}
