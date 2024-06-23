import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-advertisement',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent {
  advertisementForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.advertisementForm = this.fb.group({
      advName: ['', Validators.required],
      description: ['', Validators.required],
      timeUnit: ['minutes', Validators.required],
      rentTime: [0, Validators.required],
      advPrice: ['', Validators.required],
      userLogin: ['', Validators.required],
      imageId: [null, Validators.required],
      categoryId: [0, Validators.required],
      creationTime: [ new Date() ],
      barterAllowed: [true, Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const imageId = uuidv4();
      const formData = new FormData();
      formData.append('image', file);
      formData.append('imageId', imageId);

      this.http.post<{ imageId: number }>('http://localhost:8080/image_upload', formData)
        .subscribe(response => {
          this.advertisementForm.patchValue({
            imageId: response.imageId
          });
          console.log('Image uploaded successfully', response);
        }, error => {
          console.error('Image upload failed', error);
        });
    }
  }

  onSubmit() {
    if (this.advertisementForm.valid) {
      const formValue = this.advertisementForm.getRawValue();
      formValue.creationTime = (formValue.creationTime as Date).toISOString();

      console.log('Submitting form...', formValue);

      this.http.post('http://localhost:8080/create_advertisement', formValue)
        .subscribe(response => {
          console.log('Registration successful', response);
        }, error => {
          console.error('Registration failed', error);
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
