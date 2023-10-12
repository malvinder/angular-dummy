import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface UserData {
  id: string;
  name: string;
  email: string;
  profilePic?: string;
}

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss'],
})
@Injectable()
export class AdminTableComponent {
  displayedColumns: string[] = ['id', 'name', 'email'];
  public dataSource: any = [];

  constructor(private http: HttpClient) {}

  fetchData() {
    this.http.get('http://localhost:3500/users')?.subscribe((data: any) => {
      if (data?.status === 'success') {
        this.dataSource = [...data.data];
      }
    });
  }

  ngOnInit() {
    this.fetchData();
  }
}
