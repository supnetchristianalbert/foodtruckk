import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import LoginFormPayload from './loginFormPayload';


@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

    formBuilder = inject(FormBuilder);
    loginForm! : FormGroup<LoginFormPayload>;
    loginFormOutput = output<FormGroup>();

    constructor() {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group<LoginFormPayload>({
            username : this.formBuilder.control(new FormControl().value, [Validators.required]),
            password : this.formBuilder.control(new FormControl().value, [Validators.required])
        });
    }

    submitForm() {
        console.log('login');
        this.loginFormOutput.emit(this.loginForm);
    }

}
