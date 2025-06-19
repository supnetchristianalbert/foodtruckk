import { FormControl } from "@angular/forms";

export default class LoginFormPayload {
    username : FormControl<string|null>;
    password : FormControl<string|null>;

    constructor(username : FormControl<string|null> , passsword : FormControl<string|null> ) {
        this.username = username || null;
        this.password = passsword || null;
    }
}