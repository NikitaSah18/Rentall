import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AdvertisementComponent implements OnInit {
  advertisementForm!: FormGroup;
  newCategoryForm!: FormGroup;
  showModal: boolean = false; 

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.advertisementForm = this.fb.group({
      advName: ['', Validators.required],
      description: ['', Validators.required],
      timeUnit: ['', Validators.required],
      rentTime: [0, Validators.required],
      advPrice: ['', Validators.required],
      userLogin: ['', Validators.required],
      imageId: [null, Validators.required],
      categoryName: ['', Validators.required],
      creationTime: [new Date()],
      barterAllowed: [true, Validators.required]
    });

   /* this.newCategoryForm = this.fb.group({
      catName: ['', Validators.required]
    });*/
  }
/*
  // Метод для открытия модального окна добавления категории
  openModal() {
    this.showModal = true;
  }

  // Метод для закрытия модального окна добавления категории
  closeModal() {
    this.showModal = false;
  }

  // Метод для отправки данных новой категории на сервер
  saveNewCategory() {
    if (this.newCategoryForm.valid) {
      const catName = this.newCategoryForm.get('catName')?.value;

      // Отправка данных на сервер
      this.http.post('http://localhost:8080/create_category', { catName })
        .subscribe(response => {
          console.log('Category created successfully', response);
          // Можно выполнить дополнительные действия после успешного создания категории
          // Например, обновление списка категорий в форме объявления
          // this.updateCategoryList();
        }, error => {
          console.error('Category creation failed', error);
        });

      // Закрытие модального окна после отправки данных
      this.closeModal();
    } else {
      console.error('Form is invalid');
    }
  }*/
   
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file, file.name); 
  
      
        const options = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
  
        this.http.post<any>('http://localhost:8080/image_upload', formData, options)
          .subscribe(response => {
            console.log('Image uploaded successfully', response);
          
          }, error => {
            console.error('Image upload failed', error);
        
          });
      }
    }
  

  onSubmit() {
    if (this.advertisementForm.valid) {
      const formValue = this.advertisementForm.getRawValue();
      formValue.creationTime = (formValue.creationTime as Date).toISOString();

      console.log('Submitting form...', formValue);

      this.http.post('http://localhost:8080/create_advertisement', formValue)
        .subscribe(response => {
          console.log('Advertisement created successfully', response);
        }, error => {
          console.error('Advertisement creation failed', error);
        });
    } else {
      console.error('Form is invalid');
    }
  }



}
