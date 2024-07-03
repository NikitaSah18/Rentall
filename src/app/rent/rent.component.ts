import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule,FormsModule]
})
export class RentComponent implements OnInit {
  rentForm: FormGroup;
  alertMessage: string = '';
  showAlert: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.rentForm = this.fb.group({
      advId: [0],
      lesseeLogin: [''],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rentForm.patchValue({
        advId: params['advId'],
        lesseeLogin: params['login']
      });
    });
  }

  onSubmit() {
    if (this.rentForm.valid) {
      const url = 'http://localhost:8080/set_rent';
      this.http.post(url, this.rentForm.value).subscribe(
        response => {
          console.log('Advertisement rented:', response);
          this.showAlertMessage('Объявление арендовано успешно!');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        },
        error => {
          console.error('Error renting advertisement', error);
        }
      );
    }
  }

  showAlertMessage(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
