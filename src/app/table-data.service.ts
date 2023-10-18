import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  constructor() {}

  private dataSource = new BehaviorSubject([]);

  currentDataSource = this.dataSource.asObservable();

  setDataSource(dSource: []) {
    this.dataSource.next(dSource);
  }
}
