import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { CONSTANTS } from '../../infrastructure/utils/contants';
import { getCookie } from '../../infrastructure/utils/cookie';

@Component({
  selector: 'app-header',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    
    authorizationService = inject(AuthorizationService);
    isLoggedIn : boolean|null = null;
    editProfileUrl : string = '';


    ngOnInit() {
        this.setEditProfileUrl();
        this.isLoggedIn = this.authorizationService.isUserLoggedIn();
        this.authorizationService.getLoginState().subscribe(
            value => {
                this.isLoggedIn = value;
            }
        );
    }

    ngOnDestroy() {
        this.authorizationService.isLoggedInSubject.unsubscribe();
    }

    setEditProfileUrl() : void  {
        const userId = getCookie(CONSTANTS.USER_ID);

        this.editProfileUrl = userId ? `/profile/edit/${userId}` : '';
    }

    logout() : void {
        this.authorizationService.logout();
    }
}
