import { Component,inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupForm } from './signupForm';
import { User } from '../../../services/user/user';
import { UserService } from '../../../services/user/user.service';
 
@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

    formBuilder = inject(NonNullableFormBuilder);
    signupForm! : FormGroup<SignupForm>;
    userSignup! : User; 
    
    constructor(private userService : UserService) {}

    ngOnInit() : void {
        this.signupForm = this.formBuilder.group<SignupForm>({
            username : this.formBuilder.control('',[Validators.required, Validators.maxLength(20), Validators.min(6)]),
            password : this.formBuilder.control('', [Validators.required]),
            name : this.formBuilder.control(''),
            email : this.formBuilder.control('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
            mobile : this.formBuilder.control(0, [Validators.required, Validators.pattern(/^[0-9]/)])
        });
    }


    submitForm() : void {        
        if (this.signupForm.invalid) {
            return;
        }

        this.userSignup = this.signupForm.value;
        
        this.userService.createUser(this.userSignup).subscribe({
            next : (res) => {
                console.log(res);
                this.signupForm.reset();
            },
            error : (err)=>{
                console.log(err);
            }
        });
    }
   
}
