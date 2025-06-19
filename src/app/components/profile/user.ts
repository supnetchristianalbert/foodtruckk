export class User {
    _id? : string;
    username : string;
    password : string;
    mobile : number;
    address : string;
    name : string;
    email : string;

    constructor (
        _id : string,
        username : string,
        password : string,
        name : string,
        email : string,
        mobile : number,
        address : string
    ) {

        this._id = _id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
    }
}