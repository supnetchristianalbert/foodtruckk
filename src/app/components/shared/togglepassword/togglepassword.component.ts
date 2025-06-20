import { Component, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-togglepassword',
  imports: [
    NgClass
  ],
  templateUrl: './togglepassword.component.html',
  styleUrl: './togglepassword.component.scss'
})
export class TogglepasswordComponent {

    isShowPw  : boolean = false;
    showPasswordClass : string = 'bi-eye-fill';
    hidePasswordClass : string = 'bi-eye-slash';
    togglePW = output<boolean>();
    
    togglePasswordVisibility() {
        this.isShowPw = !this.isShowPw;
        this.togglePW.emit(this.isShowPw);
    }
}
