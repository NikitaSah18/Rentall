import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  userLogin: string = '';
  favoriteAds: any[] = [];
  advertisements: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userLogin = params['login'];
      this.getFavorites(this.userLogin);
    });
  }

  getFavorites(userLogin: string) {
    const url = `http://localhost:8080/favorites/${userLogin}`;

    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.favoriteAds = data;
        this.favoriteAds.forEach(fav => {
          this.getAdvertisementDetails(fav.advId);
        });
      },
      (error) => {
        console.error('Error fetching favorites:', error);
      }
    );
  }

  getAdvertisementDetails(advId: number) {
    const url = `http://localhost:8080/advertisement/${advId}`;
    this.http.get<any>(url).subscribe(
      (data) => {
        this.advertisements.push(data);
      },
      (error) => {
        console.error('Error fetching advertisement details:', error);
      }
    );
  }
}
