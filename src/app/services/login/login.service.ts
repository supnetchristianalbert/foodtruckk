import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './login';
import { VerifyToken } from './verifyToken';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private apiUrl = 'http://localhost:3000/api/foodtruckk/';
 

    constructor(private httpClient : HttpClient) { }

    login(loginPayload : Login) : Observable<Login> {
        return this.httpClient.post<Login>(`${this.apiUrl}login`, loginPayload);
    }

    verifyToken(token : VerifyToken) : Observable<VerifyToken> {
        return this.httpClient.post<VerifyToken>(`${this.apiUrl}verify/token`, token);
    }
 }
