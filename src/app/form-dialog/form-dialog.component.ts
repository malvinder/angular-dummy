import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  name = '';
  email = '';
  isEdit = false;
  selectedId = null;
  selectedFile = null;
  filePath = '';
  profilePic = null;

  public dataSource: any = [];

  constructor(private http: HttpClient) {}

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
          this.profilePic = event?.body?.path;
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

  setEditData(elem: any) {
    this.isEdit = true;
    this.name = elem?.name;
    this.email = elem?.email;
    this.selectedId = elem?.id;
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
          profilePic: this.profilePic,
        })
        ?.subscribe((data: any) => {
          this.isEdit = false;
          this.name = '';
          this.email = '';
          this.profilePic = null;
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
          profilePic: this.profilePic,
        })
        ?.subscribe((data: any) => {
          this.isEdit = false;
          this.name = '';
          this.email = '';
          this.profilePic = null;
          this.selectedId = null;
          if (data?.status === 'success') {
            this.dataSource = [...data.data];
          }
        });
    }
  }
}
