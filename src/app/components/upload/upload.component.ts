import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  SERVER_URL = `${environment.baseUrl}/api/upload`;
  uploadForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      score: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('score').setValue(file);
    }

  }

  onSubmit() {
    const formData = new FormData();
    formData.append('csvdata', this.uploadForm.get('score').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
      () =>  this.router.navigate([''])
    );
    }
}
