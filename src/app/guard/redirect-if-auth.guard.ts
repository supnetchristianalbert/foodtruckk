import { CanActivateFn } from '@angular/router';
import { AuthorizationService } from '../services/authorization/authorization.service';

//TODO : Rename this router guard
export const redirectIfAuthGuard: CanActivateFn = (route, state) => {
    
    const authService = new AuthorizationService();

    if (authService.isUserLoggedIn()) {

        return false;
    }

    return true;
};
