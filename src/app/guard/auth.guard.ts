import { CanActivateFn } from '@angular/router';
import { getCookie } from '../infrastructure/utils/cookie';
import { CONSTANTS } from '../infrastructure/utils/contants';

export const authGuard: CanActivateFn = (route, state) => {
    const cookieToken = getCookie(CONSTANTS.AUTH_TOKEN);

    return cookieToken === null || cookieToken === 'undefined';
};
