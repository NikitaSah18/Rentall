import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../chats/chats.component';

@Component({
  selector: 'app-advertisement-board',
  templateUrl: './advertisement-board.component.html',
  styleUrls: ['./advertisement-board.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ChatComponent]
})
export class AdvertisementBoardComponent implements OnInit {
showAlert: any;
alertMessage: any;
markAsFavorite(arg0: any) {
throw new Error('Method not implemented.');
}
navigateToReviews(arg0: any) {
throw new Error('Method not implemented.');
}
updatePrice($event: Event) {
throw new Error('Method not implemented.');
}
price: any;
clearCategoryFilter() {
  
throw new Error('Method not implemented.');
}
filterByCategory(arg0: string) {
throw new Error('Method not implemented.');
}
  advertisements: any[] = [];
  filteredAdvertisements: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAdvertisements();
  }

  fetchAdvertisements() {
    this.http.get<any[]>('http://localhost:8080/advertisement_board')
      .subscribe(data => {
        this.advertisements = data;
        this.filteredAdvertisements = [...this.advertisements]; 
      }, error => {
        console.error('Failed to fetch advertisements', error);
      });
  }

  searchAdvertisements() {
    if (this.searchTerm.trim() === '') {
      this.filteredAdvertisements = [...this.advertisements]; 
    } else {
      this.http.get<any[]>(`http://localhost:8080/search_advertisement?query=${this.searchTerm}`)
        .subscribe(data => {
          this.filteredAdvertisements = data;
        }, error => {
          console.error('Failed to fetch search results', error);
        });
    }
  }
}
