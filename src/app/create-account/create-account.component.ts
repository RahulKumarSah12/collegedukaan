import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupCreateAccountService } from '../signup-create-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  createAccountForm: FormGroup;

  constructor(private fb: FormBuilder, private myService: SignupCreateAccountService, private route: Router) {
    this.createAccountForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    if (this.createAccountForm.valid) {
      this.myService.createAccount(this.createAccountForm.value).subscribe(
        (response: any) => {
          console.log('Account Created:', response);
          const email = this.createAccountForm.get('email')?.value;
          localStorage.setItem('userEmail', email); // Store email in local storage
          this.createAccountForm.reset(); // Reset all the input fields
          this.route.navigate(['/login']);
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    }
  }
  
}
