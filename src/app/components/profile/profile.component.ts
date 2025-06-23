import { Component, Input, output } from '@angular/core';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { UserService } from '../../services/user/user.service';
import { User } from './user';

@Component({
  selector: 'app-profile',
  imports: [
    EditProfileFormComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

    userId : string = '';
    @Input()
    set id(userId : string) {
        console.log('DDDD', userId);
        this.userId = userId;
    }
    user! : User;

    constructor(private userService : UserService) {} 

    ngOnInit() {
        this.getUser();
    }

    getUser() {

        if (this.userId) {
            this.userService.getUserById(this.userId).subscribe({
                next : (res : User) => {
                    this.user = res;
                },
                error : (err : any) => {
                    console.log(err);
                }
            })
        }   
    }

}
