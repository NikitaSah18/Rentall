import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-advertisement',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './advertisement.component.html',
  styleUrl: './advertisement.component.css'
})
export class AdvertisementComponent {
  advertisementForm!: FormGroup;
  text: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.advertisementForm = this.fb.group({
      advName: ['', Validators.required],
      description: ['', Validators.required],
      timeUnit: [0, Validators.required],
      rentTime: [0, Validators.required],
      advPrice: ['', Validators.required],
      userLogin: ['', Validators.required],
      imageId: [0, Validators.required],
      categoryId: [0, Validators.required],
      creationTime: [new Date()], 
      barterAllowed: [true, Validators.required]
    });
  }

  onSubmit() {
    if (this.advertisementForm.valid) {
      const formValue = this.advertisementForm.value;
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

