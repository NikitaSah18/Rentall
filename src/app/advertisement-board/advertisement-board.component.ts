import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chats/chats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAdvertisements();
  }

  fetchAdvertisements() {
    this.http.get<any[]>('http://localhost:8080/advertisement_board')
      .subscribe(data => {
        this.advertisements = data.map(ad => ({
          ...ad,
          creationTime: new Date(ad.creationTime[0], ad.creationTime[1] - 1, ad.creationTime[2], ad.creationTime[3], ad.creationTime[4], ad.creationTime[5])
        }));
        this.filteredAdvertisements = [...this.advertisements];
        this.filterAdvertisements(); 
        console.log('Fetched advertisements:', this.advertisements); 
      }, error => {
        console.error('Failed to fetch advertisements', error);
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
    console.log('Selected category:', this.selectedCategory); 
    this.filterAdvertisements();
  }

  clearCategoryFilter() {
    this.selectedCategory = '';
    this.filterAdvertisements();
  }

  filterAdvertisements() {
    console.log('Filtering with category:', this.selectedCategory, 'and search term:', this.searchTerm, 'and price:', this.price); 
  
    this.filteredAdvertisements = this.advertisements.filter(ad => {
      const matchesCategory = this.selectedCategory ? ad.categoryName.toLowerCase().trim() === this.selectedCategory.toLowerCase().trim() : true;
      const matchesSearch = ad.advName.toLowerCase().includes(this.searchTerm.toLowerCase().trim());
      const matchesPrice = ad.advPrice <= this.price;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  
    console.log('Filtered advertisements:', this.filteredAdvertisements); 
  }
}
