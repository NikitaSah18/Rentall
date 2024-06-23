import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userFullName: ['', [Validators.required, Validators.minLength(3)]],
      userAddress: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      login: ['', [Validators.required, Validators.minLength(3)]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
      creationTime: [new Date()] 
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formValue = this.registrationForm.value;

      formValue.creationTime = (formValue.creationTime as Date).toISOString();

      console.log('Submitting form...', formValue);

      this.http.post('http://localhost:8080/registrate_user', formValue)
        .subscribe(response => {
          console.log('Registration successful', response);
        }, error => {
          console.error('Registration failed', error);
        });
    } else {
      console.error('Form is invalid');
    }
  }

  displayFormValues() {
    console.log('Form Values:', this.registrationForm.value);
  }
}
