import { CanActivateFn } from '@angular/router';
import { getCookie } from '../infrastructure/utils/cookie';
import { LoginService } from '../services/login/login.service';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage/storage.service'

export const authGuard: CanActivateFn = (route, state) => {
    const cookieToken = getCookie('ft_token');

    return cookieToken === null || cookieToken === 'undefined';
};
