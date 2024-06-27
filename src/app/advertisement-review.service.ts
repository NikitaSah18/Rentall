import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAdvertisements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/advertisement_board`);
  }

  getAdvertisementReviews(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/advertisement_review/advertisement/${postId}`);
  }

  createAdvertisementReview(postId: number, feedback: string, mark: number, userLogin: string): Observable<any> {
    const reviewData = {
      feedback,
      mark,
      postId,
      postTime: new Date().toISOString(),
      userLogin
    };
    return this.http.post<any>(`${this.baseUrl}/create_advertisement_review`, reviewData);
  }

  getAverageMark(advId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/advertisement_review/advertisement/${advId}/average_mark`);
  }
}
