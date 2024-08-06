import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupCreateAccountService } from '../signup-create-account.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  dropdownOpen = false;
  modalVisible = false;
  isAlreadySeller = false;
  products: any[] = []; // Array to store products

  constructor(private route: Router, private myService: SignupCreateAccountService) { }

  ngOnInit(): void {
    this.AllProduct();
    console.log(localStorage.getItem('isAlreadySeller'));
    if(localStorage.getItem('isAlreadySeller')){
      this.isAlreadySeller = true;
    }
    else if(localStorage.getItem('isAlreadySeller') == null ){
      this.checkSeller();
    }
    else{
      this.isAlreadySeller = false;
    }
    
  }


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  viewProfile() {
    // Implement profile viewing logic
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
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
          this.isAlreadySeller = true;
          localStorage.setItem('isAlreadySeller', 'true');
          this.route.navigate(['main-page']); // Redirect or take any other action on success
        },
        error => {
          console.error('Error:', error);
          this.isAlreadySeller = false;
          
        }
      );
    } else {
      this.isAlreadySeller = false;
      console.error('No email found in local storage.');
    }
  }

  checkSeller() {
    const email = localStorage.getItem('userEmail');
    // Call the makeSeller API to check if the seller exists
    this.myService.checkSeller({ email }).subscribe(
      sellerResponse => {
        console.log('Seller check response:', sellerResponse);
        if (sellerResponse.exist) {
          this.isAlreadySeller = true;
          console.log('Seller already exist.');
        } else {
          this.isAlreadySeller = false;
          console.log('Seller does not exist.');
        }
      },
      sellerError => {
        this.isAlreadySeller = false;
        console.error('Error checking seller status:', sellerError);
        // Handle errors from the makeSeller API
      }
    );
  }

  
  AllProduct(){
    this.myService.getproducts().subscribe(
     Response => {
      console.log(Response);
      this.products = Response; // Store the products
      console.log("Rahul");
      console.log(this.products); 
      },
      Error => {
        console.log(Error);
      }
    );
  }
  



}
