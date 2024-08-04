import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupCreateAccountService } from '../signup-create-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-lognin-page',
  templateUrl: './signup-lognin-page.component.html',
  styleUrls: ['./signup-lognin-page.component.scss']
})
export class SignupLogninPageComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private myService: SignupCreateAccountService, private route: Router) {
    this.loginForm = this.fb.group({
      contactInfo: ['', [Validators.required, this.emailOrPhoneValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  emailOrPhoneValidator(control: any) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^\d{10}$/; // Regex for exactly 10 digits
    if (emailPattern.test(control.value) || phonePattern.test(control.value)) {
      return null;
    } else {
      return { invalidContactInfo: true };
    }
  }

  restrictContactInfo(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const isDigit = /^\d$/.test(event.key);
    if (isDigit && value.length >= 10) {
      event.preventDefault();
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.myService.signIn(this.loginForm.value).subscribe(
        response => {
          console.log('User Signed In:', response);
          this.route.navigate(['main-page']); // Navigate to main-page on success
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }
  
  
}
