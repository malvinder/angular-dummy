import { Component } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'app-admin-forms',
  templateUrl: './admin-forms.component.html',
  styleUrls: ['./admin-forms.component.scss'],
})
export class AdminFormsComponent {
  name = '';
  email = '';
  isEdit = false;
  selectedId = null;
  filePath = '';
  selectedFile = null;

  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  public dataSource: any = [];

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FormDialogComponent);
  }

  openFileDialog() {
    const fileDialog = document.getElementById('profile-pic');
    if (fileDialog) {
      fileDialog.click();
    }
  }

  upload(): void {
    if (!this.selectedFile) {
      return;
    }

    this.uploadFile(this.selectedFile)?.subscribe({
      next: (event: any) => {
        if (event instanceof HttpResponse) {
          console.log('RESPONSE BODY: ', event?.body);
          this.selectedFile = null;
        }
      },
      error: (err: any) => {
        console.log('ERROR: ', err?.error);
        this.selectedFile = null;
      },
    });
  }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('attachment', file);
    const req = new HttpRequest(
      'POST',
      'http://localhost:3500/upload',
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }

  selectFile(event: any): void {
    const f = event?.target?.files?.[0];
    if (f) {
      this.selectedFile = f;
    }
  }

  addData() {
    if (!this.name && !this.email) {
      alert('Name and Email are required');
      return;
    }

    if (this.isEdit) {
      this.http
        .put('http://localhost:3500/users', {
          id: this.selectedId,
          name: this.name,
          email: this.email,
        })
        ?.subscribe((data: any) => {
          this.isEdit = false;
          this.name = '';
          this.email = '';
          this.selectedId = null;
          if (data?.status === 'success') {
            this.dataSource = [...data.data];
          }
        });
    } else {
      this.http
        .post('http://localhost:3500/users', {
          id: this.dataSource?.length + 1,
          name: this.name,
          email: this.email,
        })
        ?.subscribe((data: any) => {
          this.isEdit = false;
          this.name = '';
          this.email = '';
          this.selectedId = null;
          if (data?.status === 'success') {
            this.dataSource = [...data.data];
          }
        });
    }
  }

  setEditData(elem: any) {
    this.isEdit = true;
    this.name = elem?.name;
    this.email = elem?.email;
    this.selectedId = elem?.id;
  }

  onDelete(userId: string) {
    this.http
      .delete(`http://localhost:3500/users/${userId}`)
      ?.subscribe((data: any) => {
        this.isEdit = false;
        this.name = '';
        this.email = '';
        this.selectedId = null;
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
