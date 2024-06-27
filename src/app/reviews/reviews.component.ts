import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdvertisementService } from '../advertisement-review.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class ReviewsComponent implements OnInit {
  postId!: number;
  reviews: any[] = [];
  feedback: string = '';
  mark: number = 0;
  userLogin: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private reviewService: AdvertisementService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = +params['id'];
      this.fetchReviews();
    });
  }

  fetchReviews() {
    this.reviewService.getAdvertisementReviews(this.postId)
      .subscribe(reviews => {
        this.reviews = reviews.map(review => ({
          ...review,
          postTime: new Date(review.postTime[0], review.postTime[1] - 1, review.postTime[2], review.postTime[3], review.postTime[4], review.postTime[5])
        }));
        console.log('Fetched reviews:', this.reviews);
      }, error => {
        console.error('Failed to fetch reviews:', error);
      });
  }

  createReview() {
    if (this.userLogin && this.feedback && this.mark >= 0 && this.mark <= 5) {
      this.reviewService.createAdvertisementReview(this.postId, this.feedback, this.mark, this.userLogin)
        .subscribe(response => {
          console.log('Review created successfully:', response);
          this.fetchReviews();
          // Reset form fields
          this.feedback = '';
          this.mark = 0;
        }, error => {
          console.error('Failed to create review:', error);
        });
    } else {
      console.error('Please fill in all required fields');
    }
  }
}
