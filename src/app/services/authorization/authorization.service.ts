import { Injectable, inject } from '@angular/core';
import { getCookie, deleteCookie, setCookie } from '../../infrastructure/utils/cookie';
import { CONSTANTS } from '../../infrastructure/utils/contants';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

    router = inject(Router);
    isLoggedInSubject = new BehaviorSubject<boolean|null>(null);
    private expDate = new Date(new Date().getTime() + (60 * 60 * 1000));
    
    constructor() { }

    isUserLoggedIn() : boolean {
        const authToken = getCookie(CONSTANTS.AUTH_TOKEN);
        return authToken !== null;
    }

    logout() : void {
        deleteCookie(CONSTANTS.AUTH_TOKEN);
        deleteCookie(CONSTANTS.USER_ID);
        this.setLoginState(false);
        this.router.navigate(['/home']);
    }

    setLoginState(state : boolean) {
        this.isLoggedInSubject.next(state);
    }

    getLoginState() : Observable<boolean|null> {
        
        if (!this.isLoggedInSubject.value) {
            this.isLoggedInSubject.next(this.isUserLoggedIn());
        }

        return this.isLoggedInSubject.asObservable();
    }

    authorize (res : any) {
        const { userId, token } = res;
        this.persistAuthenticationAndUser(userId, token);
        this.setLoginState(true);
    }

    private persistAuthenticationAndUser(userId : string , token : string) {

        deleteCookie(CONSTANTS.AUTH_TOKEN);
        setCookie(CONSTANTS.AUTH_TOKEN, token, this.expDate);

        deleteCookie(CONSTANTS.USER_ID);
        setCookie(CONSTANTS.USER_ID, userId, this.expDate);
    }
}
