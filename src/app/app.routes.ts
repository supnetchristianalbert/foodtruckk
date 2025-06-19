import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { authGuard } from './guard/auth.guard';
import { redirectIfAuthGuard } from './guard/redirect-if-auth.guard';

export const routes: Routes = [
    {
        path : '', 
        redirectTo : '/home',
        pathMatch : 'full'
    },
    {
        path : 'home', 
        component: HomeComponent 
    },
    {
        path : 'login', component : LoginComponent, canActivate : [redirectIfAuthGuard]
    },
    {
        path : 'forgot-password', component : ForgotpasswordComponent
    },
    {
        path : 'signup', component : SignupComponent
    },
    {
        path : 'profile/:id', 
        component: ProfileComponent,
        canActivate : [authGuard]
    },
    {
        path: "**" , component : PagenotfoundComponent
    }
];
