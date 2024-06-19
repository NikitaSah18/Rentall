import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AlertComponent]
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
  
      this.http.post('http://localhost:8080/login', formValue, { responseType: 'text' })
        .subscribe(response => {
          this.closeModal(); // Закрываем модальное окно при успешной авторизации
          this.alertComponent.message = response;
        }, error => {
          console.error('Login failed', error);
        });
    } else {
      console.error('Form is invalid');
    }
  }
  
  closeModal() {
    this.modalService.dismissAll(); // Метод для закрытия модального окна
  }
}
