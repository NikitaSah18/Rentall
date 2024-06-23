import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../alert/alert.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, AlertComponent,ReactiveFormsModule,FormsModule],
  standalone: true
})
export class NavbarComponent implements OnInit {
  @ViewChild(AlertComponent) alertComponent!: AlertComponent;
  loginForm!: FormGroup;
  isLoggedIn = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private modalService: NgbModal) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;

      this.authService.login(formValue).subscribe(
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
    this.alertComponent.message = `Добро пожаловать, ${response.userFullName}!`;
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  logout() {
    this.authService.logout();
    this.alertComponent.message = 'You have logged out successfully.';
  }
}
