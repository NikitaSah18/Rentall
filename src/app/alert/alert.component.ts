import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-alert',
  template: `
    <div *ngIf="message" class="alert alert-success alert-dismissible fade show" role="alert">
     {{ message }}!
      <button type="button" class="btn-close" aria-label="Close" (click)="closeAlert()"></button>
      <div class="progress">
        <div class="progress-bar" role="progressbar" [style.width]="progress + '%'"></div>
      </div>
    </div>
  `,
  styleUrls: [],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AlertComponent implements OnChanges {
  @Input() message: string | null = null;
  progress: number = 100;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['message'] && this.message) {
      this.startProgressBar();
      setTimeout(() => {
        this.closeAlert();
      }, 5000); // Adjust this value to control how long the alert is visible (milliseconds)
    }
  }

  startProgressBar() {
    this.progress = 100;
    const interval = setInterval(() => {
      this.progress -= 2; // Adjust this value for different speed of progress bar
      if (this.progress <= 0) {
        clearInterval(interval);
      }
    }, 100);
  }

  closeAlert() {
    this.message = null;
  }
}
