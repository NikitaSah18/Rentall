import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { AdvertisementBoardComponent } from './advertisement-board/advertisement-board.component';
import { ChatComponent } from './chats/chats.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyAdvertisementComponent } from './my-advertisement/my-advertisement.component';
import { RentComponent } from './rent/rent.component';

export const routes: Routes = [
    {path:"",component:AdvertisementBoardComponent},
    {path:"Registration", component:RegistrationComponent},
    {path:"Advertisement", component:AdvertisementComponent},
    {path:"Advertisement-board", component:AdvertisementBoardComponent},
    {path:"Chats", component:ChatComponent},
    { path: 'reviews/:id', component: ReviewsComponent },
    { path: 'favorites/:login', component: FavoritesComponent },
    {path:'myAdvertisement/:login', component:MyAdvertisementComponent},
    { path: 'rent/:advId/:login', component: RentComponent }
];
