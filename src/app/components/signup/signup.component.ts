import { Component, inject } from '@angular/core';
import { FormComponent } from './form/form.component';
import { UserService } from '../../services/user/user.service';
import { FormGroup } from '@angular/forms';
import { SignupForm } from './form/signupForm';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization/authorization.service';


@Component({
  selector: 'app-signup',
  imports: [
    FormComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
    
    userService = inject(UserService);
    router = inject(Router);
    authService = inject(AuthorizationService);

    constructor() {}

    onSubmitSignupForm(signupFormGroup : FormGroup) {
        const user = new SignupForm(
            signupFormGroup.controls['username'].value, 
            signupFormGroup.controls['password'].value,
            signupFormGroup.controls['name'].value,
            signupFormGroup.controls['email'].value,
            signupFormGroup.controls['mobile'].value,
            signupFormGroup.controls['address'].value
        );

        this.userService.createUser(user).subscribe({
            next : (res : any) => {
                this.authService.authorize(res);
                this.router.navigate(['/home']);
            },
            error : (err)=>{
                console.log(err);
            }
        });
    }
    
}
