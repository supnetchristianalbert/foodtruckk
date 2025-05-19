import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {
        path : 'login', component : LoginComponent
    },
    {
        path : 'signup', component : SignupComponent
    },
    {
        path : 'profile', component: ProfileComponent
    }
];
