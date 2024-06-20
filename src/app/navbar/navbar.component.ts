import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [ReactiveFormsModule, CommonModule,AlertComponent],
  standalone:true
})
export class NavbarComponent {
  @ViewChild(AlertComponent) alertComponent!: AlertComponent;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.pattern('^\\d+$')]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
  
      this.http.post<any>('http://localhost:8080/login', formValue)
        .subscribe(
          response => {
            this.handleSuccess(response);
          },
          error => {
            console.error('Login failed', error);
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }

  handleSuccess(response: any) {
    this.closeModal(); 
    this.alertComponent.message = response.userFullName; 
  }
  
  closeModal() {
    this.modalService.dismissAll(); 
  }
}
