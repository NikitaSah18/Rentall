import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdvertisementService } from '../advertisement-review.service'; 
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chats/chats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-advertisement-board',
  templateUrl: './advertisement-board.component.html',
  styleUrls: ['./advertisement-board.component.css'],
  standalone: true,
  imports: [CommonModule, ChatComponent, ReactiveFormsModule, FormsModule]
})
export class AdvertisementBoardComponent implements OnInit {
  advertisements: any[] = [];
  filteredAdvertisements: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  price: number = 10000;
  showAlert: boolean = false; 
  alertMessage: string = '';  

  constructor(
    private http: HttpClient,
    private router: Router,
    private advertisementService: AdvertisementService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchAdvertisements();
  }

  fetchAdvertisements() {
    this.advertisementService.getAdvertisements().subscribe(data => {
      this.advertisements = data.map(ad => ({
        ...ad,
        creationTime: new Date(ad.creationTime[0], ad.creationTime[1] - 1, ad.creationTime[2], ad.creationTime[3], ad.creationTime[4], ad.creationTime[5])
      }));
      this.filteredAdvertisements = [...this.advertisements];
      this.filterAdvertisements();
      this.fetchAverageMarks(); 
    }, error => {
      console.error('Failed to fetch advertisements', error);
    });
  }

  fetchAverageMarks() {
    this.advertisements.forEach(ad => {
      this.advertisementService.getAverageMark(ad.advId).subscribe(
        (averageMark: number) => {
          ad.averageMark = averageMark.toFixed(1);
        },
        error => {
          console.error(`Failed to fetch average mark for advertisement ${ad.advId}`, error);
        }
      );
    });
  }

  searchAdvertisements() {
    this.filterAdvertisements();
  }

  updatePrice(event: any): void {
    this.price = parseInt(event.target.value);
    this.filterAdvertisements();
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filterAdvertisements();
  }

  clearCategoryFilter() {
    this.selectedCategory = '';
    this.filterAdvertisements();
  }

  filterAdvertisements() {
    this.filteredAdvertisements = this.advertisements.filter(ad => {
      const matchesCategory = this.selectedCategory ? ad.categoryName.toLowerCase().trim() === this.selectedCategory.toLowerCase().trim() : true;
      const matchesSearch = ad.advName.toLowerCase().includes(this.searchTerm.toLowerCase().trim());
      const matchesPrice = ad.advPrice <= this.price;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }

  navigateToReviews(advertisementId: number) {
    this.router.navigate(['/reviews', advertisementId]);
  }

  markAsFavorite(adId: number) {
    const userLogin = this.authService.getCurrentUser().login;
    if (!userLogin) {
      console.error('User not logged in');
      return;
    }

    const url = 'http://localhost:8080/mark_favorite';
    const body = { advId: adId, userLogin };

    this.http.post(url, body).subscribe(
      response => {
        console.log('Marked as favorite:', response);
        this.showAlertMessage('Объявление добавлено в избранное!'); 
      },
      error => {
        console.error('Error marking as favorite', error);
      }
    );
  }

  showAlertMessage(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  navigateToRent(adId: number) {
    const userLogin = this.authService.getCurrentUser().login;
    this.router.navigate(['/rent', adId, userLogin]); 
  }
}
