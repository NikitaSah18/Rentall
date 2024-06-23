import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { AdvertisementBoardComponent } from './advertisement-board/advertisement-board.component';
import { ChatComponent } from './chats/chats.component';

export const routes: Routes = [
    {path:"Registration", component:RegistrationComponent},
    {path:"Advertisement", component:AdvertisementComponent},
    {path:"Advertisement-board", component:AdvertisementBoardComponent},
    {path:"Chats", component:ChatComponent}
];
