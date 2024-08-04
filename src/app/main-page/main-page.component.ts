import { Component, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupCreateAccountService } from '../signup-create-account.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {


  constructor(private route: Router, private myService: SignupCreateAccountService) {}
  
  dropdownOpen = false;
  modalVisible = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  viewProfile() {
    // Implement profile viewing logic
  }

  logout() {
    this.route.navigate(['login']);
  }

  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  submitForm() {
    // Implement form submission logic
    console.log('Form submitted');
    this.closeModal(); // Close the modal after submission if desired
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const isDropdownClick = target.closest('.profile-dropdown');

    if (!isDropdownClick) {
      this.dropdownOpen = false;
    }
  }


  // Handle "Make Me a Seller" button click
  makeMeASeller(): void {
    const email = localStorage.getItem('userEmail');

    if (email) {
      this.myService.makeSeller({ email }).subscribe(
        response => {
          console.log('Seller request successful:', response);
          this.closeModal(); // Close the modal on success
          this.route.navigate(['main-page']); // Redirect or take any other action on success
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('No email found in local storage.');
    }
  }
  
}
