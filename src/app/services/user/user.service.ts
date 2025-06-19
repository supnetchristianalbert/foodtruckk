import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { SignupForm } from '../../components/signup/form/signupForm';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/api/foodtruckk/users';

    constructor(private httpClient : HttpClient) { }

    getUsers() : Observable<User[]> {
        return this.httpClient.get<User[]>(this.apiUrl);
    }

    getUserById(id : string) : Observable<User> {
        return this.httpClient.get<User>(`${this.apiUrl}/${id}`);
    }

    createUser(user : SignupForm) : Observable<User> {
        return this.httpClient.post<User>(this.apiUrl, user);
    }

    updateUser(user : User) : Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/${user._id}`, user);
    }

    deleteUser(user : User) : Observable<User> {
        return this.httpClient.delete<User>(`${this.apiUrl}/${user._id}`);
    }
}
