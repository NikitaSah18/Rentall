import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { ChatComponent } from '../chats/chats.component';

@Component({
  selector: 'app-advertisement-board',
  templateUrl: './advertisement-board.component.html',
  styleUrls: ['./advertisement-board.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ChatComponent] // Add FormsModule here
})
export class AdvertisementBoardComponent implements OnInit {
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
        this.filteredAdvertisements = [...this.advertisements]; // Initialize filtered list
      }, error => {
        console.error('Failed to fetch advertisements', error);
      });
  }

  searchAdvertisements() {
    if (this.searchTerm.trim() === '') {
      this.filteredAdvertisements = [...this.advertisements]; // Reset to all advertisements if search term is empty
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
