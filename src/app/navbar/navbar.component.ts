import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class NavbarComponent {
  loginForm!: FormGroup;

 
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.pattern('^\\d+$')]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;


      console.log('Submitting form...', formValue);

      this.http.post('http://localhost:8080/login', formValue)
        .subscribe(response => {
          console.log('login successful', response);
        }, error => {
          console.error('login failed', error);
        });
    } else {
      console.error('Form is invalid');
    }
  }

  displayFormValues() {
    console.log('Form Values:', this.loginForm.value);
  }
}
 
