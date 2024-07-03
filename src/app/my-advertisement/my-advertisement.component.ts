import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-advertisement',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './my-advertisement.component.html',
  styleUrl: './my-advertisement.component.css'
})
export class MyAdvertisementComponent implements OnInit {
  userLogin: string = '';
  advertisements: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userLogin = params['login'];
      this.getMyAds(this.userLogin);
    });
  }

  getMyAds(userLogin: string) {
    const url = `http://localhost:8080/advertisement/user/${userLogin}`;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.advertisements = data.map(ad => ({
          ...ad,
          creationTime: new Date(
            ad.creationTime[0],
            ad.creationTime[1] - 1,
            ad.creationTime[2],
            ad.creationTime[3],
            ad.creationTime[4],
            ad.creationTime[5],
            ad.creationTime[6]
          )
        }));
      },
      (error) => {
        console.error('Error fetching advertisements:', error);
      }
    );
  }

  deleteAd(advId: number) {
    const url = `http://localhost:8080/delete_advertisement/${advId}`;
    this.http.delete(url).subscribe(
      () => {
        this.advertisements = this.advertisements.filter(ad => ad.advId !== advId);
      },
      (error) => {
        console.error('Error deleting advertisement:', error);
      }
    );
  }

  confirmDelete(content: any, advId: number) {
    this.modalService.open(content).result.then(
      (result) => {
        if (result === 'yes') {
          this.deleteAd(advId);
        }
      },
      (reason) => {}
    );
  }
}
