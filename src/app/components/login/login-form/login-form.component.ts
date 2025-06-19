import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import LoginFormPayload from './loginFormPayload';
import { getCookie, deleteCookie, setCookie } from '../../../infrastructure/utils/cookie';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    RouterLink
],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
    rememberMe : string = 'VGh1IEp1biAxOSAy';
    formBuilder = inject(FormBuilder);
    loginForm! : FormGroup<LoginFormPayload>;
    loginFormOutput = output<FormGroup>();
    isRememberme : boolean = false;
    isShowPw : boolean = false;
    showPasswordClass : string = 'bi-eye-fill';
    hidePasswordClass : string = 'bi-eye-slash';
    passwordType : string = 'password';

    constructor() {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group<LoginFormPayload>({
            username : this.formBuilder.control(new FormControl().value, [Validators.required]),
            password : this.formBuilder.control(new FormControl().value, [Validators.required])
        });

        const rememberMe = getCookie(this.rememberMe);

        if (rememberMe) {
            this.setLoginFields(rememberMe);
            this.isRememberme = true;
        } else {
            this.isRememberme = false;
        }
    }

    submitForm() : void {
        if (this.isRememberme) {
            this.rememberUsernamePassword();
        } else {
            deleteCookie(this.rememberMe);
        }

        this.loginFormOutput.emit(this.loginForm);
    }

    rememberUsernamePassword() : void {
        const username = this.loginForm.controls.username.value;
        const password = this.loginForm.controls.password.value;

        if (username && password) {
            const loginCredentials = {
                username : username,
                password : password
            };

            deleteCookie(this.rememberMe);
            setCookie(this.rememberMe, btoa(JSON.stringify(loginCredentials)));
        }
    }

    setLoginFields(rememberMe : string) : void {

        const parsedRememberMe = JSON.parse(atob(rememberMe));

        this.loginForm.controls.username.patchValue(parsedRememberMe.username);
        this.loginForm.controls.password.patchValue(parsedRememberMe.password);
    }

    togglePasswordVisibility() : void {
        this.isShowPw = !this.isShowPw;
        this.passwordType = this.isShowPw ? 'text' : 'password';
    }
}
