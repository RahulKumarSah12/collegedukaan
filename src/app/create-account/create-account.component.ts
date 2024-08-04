import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupCreateAccountService } from '../signup-create-account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  createAccountForm: FormGroup;

  constructor(private fb: FormBuilder, private myService: SignupCreateAccountService) {
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
          this.createAccountForm.reset(); // Reset all the input fields
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    }
  }
  
}
