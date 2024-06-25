import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chats/chats.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-advertisement-board',
  templateUrl: './advertisement-board.component.html',
  styleUrls: ['./advertisement-board.component.css'],
  standalone: true,
  imports: [CommonModule,ChatComponent,ReactiveFormsModule,FormsModule]
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
      this.filteredAdvertisements = this.advertisements.filter(ad =>
        ad.advName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}

