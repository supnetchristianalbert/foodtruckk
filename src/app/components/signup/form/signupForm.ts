import { FormControl } from "@angular/forms";

export class SignupForm {
    username : FormControl<string>;
    password : FormControl<string>;
    name : FormControl<string>;
    email : FormControl<string>;
    mobile : FormControl<number>;

    constructor(
        username : FormControl<string>,
        password : FormControl<string>,
        name : FormControl<string>,
        email : FormControl<string>,
        mobile : FormControl<number>
    ) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    }
}