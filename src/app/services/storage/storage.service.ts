import { Injectable } from '@angular/core';
import { getCookie, setCookie, deleteCookie } from '../../infrastructure/utils/cookie';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

    FT_TOKEN : string = 'ft_token';
    FT_USER : string = 'ft_user';

    constructor() { }


    persistAuthenticationAndUser(res : any) {

        const {userId, token} = res;
        const expiration = new Date(new Date().getTime() + (60 * 60 * 1000));

        deleteCookie(this.FT_TOKEN);
        setCookie(this.FT_TOKEN, token, expiration);

        this.persistUser(userId, expiration);
    }

    private persistUser(userId : string, expiration : any) {

        deleteCookie(this.FT_USER);
        setCookie(this.FT_USER, userId, expiration);
    }
}
 