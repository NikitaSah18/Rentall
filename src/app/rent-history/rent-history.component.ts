import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';

interface Rent {
  rentId: number;
  startDateTime: string;
  endDateTime: string;
}
@Component({
  selector: 'app-rent-history',
  templateUrl: './rent-history.component.html',
  styleUrls: ['./rent-history.component.css'],
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule,FormsModule],
  providers: [DatePipe]
})
export class RentHistoryComponent implements OnInit {
  login: string | null = null;
  rentHistory: Rent[] = []; 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private datePipe: DatePipe 
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.login = params['login'];
      if (this.login) {
        this.loadRentHistory(this.login);
      }
    });
  }

  loadRentHistory(login: string) {
    this.http.get<any[]>(`http://localhost:8080/rent_history/user/${login}`).subscribe(
      data => {
        this.rentHistory = data.map(rent => ({
          rentId: rent.rentId,
          startDateTime: this.convertArrayToDate(rent.startDateTime),
          endDateTime: this.convertArrayToDate(rent.endDateTime)
        }));
      },
      error => {
        console.error('Failed to load rent history', error);
      }
    );
  }
  
  convertArrayToDate(dateArray: number[]): string {
    const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
    return this.datePipe.transform(date, 'medium') || '';
  }

  generateDocument(rentId: number) {
    this.http.post('http://localhost:8080/generate-documents', { rentId }, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const filename = `document_${rentId}.docx`; 
        saveAs(response, filename);
      },
      error => {
        console.error('Failed to generate documents', error);
      }
    );
  }
}

