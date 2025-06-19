import { Component } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Login } from '../../services/login/login';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { User } from '../profile/user';

@Component({
  selector: 'app-login',
  imports: [
    LoginFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    constructor(
        private loginService : LoginService, 
        private storage : StorageService,
        private router : Router
    ){}

    onSubmitLoginForm(event  : FormGroup) : void {

        const payload = new Login(event.value.username, event.value.password);

        this.loginService.login(payload).subscribe({
            next : (res : any) => {                
                this.storage.persistAuthenticationAndUser(res);
                this.router.navigate(['/home']);
            },
            error : (err : any) => {

            }
        });
    }
}
