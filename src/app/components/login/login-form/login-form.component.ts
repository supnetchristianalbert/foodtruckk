import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import LoginFormPayload from './loginFormPayload';
import { getCookie, deleteCookie, setCookie } from '../../../infrastructure/utils/cookie';


@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    FormsModule
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

    constructor() {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group<LoginFormPayload>({
            username : this.formBuilder.control(new FormControl().value, [Validators.required]),
            password : this.formBuilder.control(new FormControl().value, [Validators.required])
        });

        const rememberMe = getCookie(this.rememberMe);

        if (rememberMe) {
            this.setLogindFields(rememberMe);
            this.isRememberme = true;
        } else {
            this.isRememberme = false;
        }
    }

    submitForm() : void {
        if (this.isRememberme) {
            this.rememberUsernamePassword();
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

    setLogindFields(rememberMe : string) : void {

        const parsedRememberMe = JSON.parse(atob(rememberMe));

        this.loginForm.controls.username.patchValue(parsedRememberMe.username);
        this.loginForm.controls.password.patchValue(parsedRememberMe.password);
    }
}
