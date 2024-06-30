import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
})
export class AdvertisementComponent implements OnInit {
markAsFavorite(arg0: any) {
throw new Error('Method not implemented.');
}
navigateToReviews(arg0: any) {
throw new Error('Method not implemented.');
}
showAlert: any;
alertMessage: any;
filteredAdvertisements: any;
searchAdvertisements() {
throw new Error('Method not implemented.');
}
searchTerm: any;
clearCategoryFilter() {
throw new Error('Method not implemented.');
}
filterByCategory(arg0: string) {
throw new Error('Method not implemented.');
}
updatePrice($event: Event) {
throw new Error('Method not implemented.');
}
  advertisementForm!: FormGroup;
  newCategoryForm!: FormGroup;
  showModal: boolean = false; 
  selectedFile: File | null = null; 
price: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.advertisementForm = this.fb.group({
      advName: ['', Validators.required],
      description: ['', Validators.required],
      timeUnit: ['', Validators.required],
      rentTime: [0, Validators.required],
      advPrice: ['', Validators.required],
      userLogin: ['', Validators.required],
      categoryName: ['', Validators.required],
      creationTime: [new Date()],
      barterAllowed: [true, Validators.required]
    });
  }
   
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.advertisementForm.valid) {
      const formValue = this.advertisementForm.getRawValue();
      formValue.creationTime = (formValue.creationTime as Date).toISOString();

      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile, this.selectedFile.name);

        this.http.post<any>('http://localhost:8080/image_upload', formData)
          .subscribe(response => {
            console.log('Image uploaded successfully', response);
            formValue.imageId = response.imageId;
            this.http.post('http://localhost:8080/create_advertisement', formValue)
              .subscribe(adResponse => {
                console.log('Advertisement created successfully', adResponse);
              }, adError => {
                console.error('Advertisement creation failed', adError);
              });
          }, error => {
            console.error('Image upload failed', error);
          });
      } else {
        console.error('No image file selected');
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
