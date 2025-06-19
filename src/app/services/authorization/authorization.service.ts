import { Injectable } from '@angular/core';
import { getCookie } from '../../infrastructure/utils/cookie';
import { CONSTANTS } from '../../infrastructure/utils/contants';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

    constructor() { }

    isUserLoggedIn() : boolean {
        const authToken = getCookie(CONSTANTS.AUTH_TOKEN);
        return authToken !== null;
    }
}
