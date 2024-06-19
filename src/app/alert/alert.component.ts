import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-alert',
  template: `
    <div *ngIf="message" class="alert alert-success alert-dismissible fade show" role="alert">
      Добро пожаловать, {{ message }}!
      <button type="button" class="btn-close" aria-label="Close" (click)="closeAlert()"></button>
      <div class="progress-bar"></div>
    </div>
  `,
  standalone: true,
  styleUrls: [],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AlertComponent implements OnChanges {
  @Input() message: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message'] && this.message) {
      setTimeout(() => {
        this.closeAlert();
      }, 5000); // Change this value to adjust how long the alert is visible (milliseconds)
    }
  }

  closeAlert() {
    this.message = null;
  }
}
