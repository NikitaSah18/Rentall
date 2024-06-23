import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chats/chats.component';

@Component({
  selector: 'app-advertisement-board',
  templateUrl: './advertisement-board.component.html',
  styleUrls: ['./advertisement-board.component.css'],
  standalone: true,
  imports: [CommonModule,ChatComponent]
})
export class AdvertisementBoardComponent implements OnInit {
  advertisements: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAdvertisements();
  }

  fetchAdvertisements() {
    this.http.get<any[]>('http://localhost:8080/advertisement_board')
      .subscribe(data => {
        this.advertisements = data;
      }, error => {
        console.error('Failed to fetch advertisements', error);
      });
  }
}
