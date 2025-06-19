import { Component,inject, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupForm } from './signupForm';
import { User } from '../../../services/user/user';
 
@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

    formBuilder = inject(FormBuilder);
    signupForm! : FormGroup<SignupForm>;
    userSignup! : User; 
    signupFormOutput = output<FormGroup>();
    
    constructor() {}

    ngOnInit() : void {
        this.signupForm = this.formBuilder.group<SignupForm>({
            username : this.formBuilder.control(new FormControl('').value,[Validators.required, Validators.maxLength(20), Validators.min(6)]),
            password : this.formBuilder.control('', [Validators.required]),
            name : this.formBuilder.control(''),
            email : this.formBuilder.control('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
            mobile : this.formBuilder.control(0, [Validators.required, Validators.pattern(/^[0-9]/)]),
            address : this.formBuilder.control(new FormControl('').value)
        });
    }


    submitForm() : void {        
        if (this.signupForm.invalid) {
            return;
        }

        this.signupFormOutput.emit(this.signupForm);
                
    }
   
}
