import { Component, Input, output } from '@angular/core';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { UserService } from '../../services/user/user.service';
import { User } from './user';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {  } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [
    EditProfileFormComponent,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

    userId : string = '';
    @Input()
    set id(userId : string) {
        this.userId = userId;
    }
    userData! : User;

    constructor(private userService : UserService) {} 

    ngOnInit() {
        this.getUser();
    }

    getUser() {

        if (this.userId) {
            this.userService.getUserById(this.userId).subscribe({
                next : (res : User) => {
                    this.userData = res;
                },
                error : (err : any) => {
                    console.log(err);
                }
            })
        }   
    }


    updateUserProfile(e : any) {
        //TODO: implement update user
    }
}
