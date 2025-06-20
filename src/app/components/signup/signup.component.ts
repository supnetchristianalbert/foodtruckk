import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { UserService } from '../../services/user/user.service';
import { FormGroup } from '@angular/forms';
import { SignupForm } from './form/signupForm';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { User } from '../profile/user';


@Component({
  selector: 'app-signup',
  imports: [
    FormComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
    
    constructor(
        private userService : UserService, 
        private router : Router,
        private storageService : StorageService
    ) {}


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
                this.storageService.persistAuthenticationAndUser(res);
                this.router.navigate(['/home']);
            },
            error : (err)=>{
                console.log(err);
            }
        });
    }
    
}
