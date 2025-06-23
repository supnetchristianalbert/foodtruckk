import { Component, inject } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Login } from '../../services/login/login';
import { Router } from '@angular/router';
import { User } from '../profile/user';
import { AuthorizationService } from '../../services/authorization/authorization.service';

@Component({
  selector: 'app-login',
  imports: [
    LoginFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    authService = inject(AuthorizationService);
    loginService = inject(LoginService);
    router = inject(Router);
    constructor(){}

    onSubmitLoginForm(event  : FormGroup) : void {

        const payload = new Login(event.value.username, event.value.password);

        this.loginService.login(payload).subscribe({
            next : (res : any) => {                
                this.authService.authorize(res);
                this.router.navigate(['/home']);
            },
            error : (err : any) => {
                //TODO : Display login error
            }
        });
    }
}
