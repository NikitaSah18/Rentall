import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';

export const routes: Routes = [
    {path:"Registration", component:RegistrationComponent},
    {path:"Advertisement", component:AdvertisementComponent}
];
