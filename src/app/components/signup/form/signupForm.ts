import { FormControl } from "@angular/forms";

export class SignupForm {
    username : FormControl<string|null>;
    password : FormControl<string|null>;
    name : FormControl<string|null>;
    email : FormControl<string|null>;
    mobile : FormControl<number|null>;
    address : FormControl<string|null>;

    constructor(
        username : FormControl<string|null>,
        password : FormControl<string|null>,
        name : FormControl<string|null>,
        email : FormControl<string|null>,
        mobile : FormControl<number>,
        address : FormControl<string|null>
    ) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
    }
}