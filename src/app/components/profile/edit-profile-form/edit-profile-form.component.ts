import { Component, inject, Input, input, output } from '@angular/core';
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

    user = input.required<User>();
    formBuilder = inject(FormBuilder);
    editProfileForm! : FormGroup<EditProfilePayload>;
    editFormOutput = output<FormGroup>();
    
    constructor() {}

    ngOnChanges() {
        this.initialLizeEditProfileForm();   
    }


    initialLizeEditProfileForm() {
        this.editProfileForm = this.formBuilder.group<EditProfilePayload>({
            username : this.formBuilder.control(this.user().username, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
            name : this.formBuilder.control(this.user().name),
            address : this.formBuilder.control(this.user().address, [Validators.required]),
            email : this.formBuilder.control(this.user().email, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
            mobile : this.formBuilder.control(this.user().mobile, [Validators.required, Validators.pattern(/^[0-9]/)])
        })
    }

    submitForm() {
        this.editFormOutput.emit(this.editProfileForm);
    }


     
}
