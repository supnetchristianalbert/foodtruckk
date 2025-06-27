import { Component, inject, Input, input, output, computed, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EditProfilePayload } from './editProfilePayload';
import { User } from '../user';

@Component({
  selector: 'app-edit-profile-form',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile-form.component.html',
  styleUrl: './edit-profile-form.component.scss'
})
export class EditProfileFormComponent {

    userData = input<User>();
    formBuilder = inject(FormBuilder);
    editProfileForm! : FormGroup<EditProfilePayload>;
    editFormOutput = output<FormGroup>();

    constructor() {}

    ngOnChanges(changes : SimpleChanges) {
        if (changes['userData'].currentValue) {
            this.initialLizeEditProfileForm(changes['userData'].currentValue);
        }
    }


    initialLizeEditProfileForm(userData : User) {
       this.editProfileForm = this.formBuilder.group<EditProfilePayload>({
            username : this.formBuilder.control(userData.username),
            name : this.formBuilder.control(userData.name),
            address : this.formBuilder.control(userData.address, [Validators.required]),
            email : this.formBuilder.control(userData.email, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
            mobile : this.formBuilder.control(userData.mobile, [Validators.required, Validators.pattern(/^[0-9]/)])
        });
    }

    submitForm() {
        this.editFormOutput.emit(this.editProfileForm);
    }
}
