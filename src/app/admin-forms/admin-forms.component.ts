import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-forms',
  templateUrl: './admin-forms.component.html',
  styleUrls: ['./admin-forms.component.scss'],
})
export class AdminFormsComponent {
  name = '';
  email = '';

  displayedColumns: string[] = ['id', 'name', 'email'];
  public dataSource: any = [];

  constructor(private http: HttpClient) {}

  addData() {
    if (!this.name && !this.email) {
      alert('Name and Email are required');
      return;
    }

    this.http
      .post('http://localhost:3500/users', {
        id: this.dataSource?.length + 1,
        name: this.name,
        email: this.email,
      })
      ?.subscribe((data: any) => {
        if (data?.status === 'success') {
          this.dataSource = [...data.data];
        }
      });
  }

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
