import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UseridServiceService {
  constructor() {}

  private userId = new BehaviorSubject(5);

  currentDataSource = this.userId.asObservable();

  setUserId(dSource: number) {
    this.userId.next(dSource);
  }
}
