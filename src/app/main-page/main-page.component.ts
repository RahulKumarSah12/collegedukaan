import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupCreateAccountService } from '../signup-create-account.service';
import { catchError, finalize, map, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  dropdownOpen = false;
  form!: FormGroup;
  otpForm!: FormGroup;
  modalVisible = false;
  showOtpForm: boolean = false;
  isAlreadySeller = false;
  products: any[] = []; // Array to store products

  productName: string = '';
  collegeName: string = '';
  filteredProducts: any[] = [];

  isLoading = false;

  constructor(private fb: FormBuilder, private route: Router, private myService: SignupCreateAccountService, private snackBar: MatSnackBar, private renderer: Renderer2) { 
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Example for 10-digit phone number
      location: ['', [Validators.required]]
    });
  }

  onOtpChange(otp: string) {
    // Update the form control with the new OTP value
    this.otpForm.get('otp')?.setValue(otp, { emitEvent: false });
  }

  @ViewChild('carouselTrack') carouselTrack!: ElementRef;

  products1 = ['Shoe', 'Cooler', 'Cycle', 'TV', 'Bike', 'Bed', 'Bed Sheet', 'Pillow', 'Bike', 'Bed', 'Bed Sheet', 'Pillow'];
  slideWidth!: number;



  ngAfterViewInit(): void {
    this.slideWidth = this.carouselTrack.nativeElement.children[0].getBoundingClientRect().width;
    this.startCarousel();
  }

  startCarousel(): void {
    setInterval(() => {
      this.carouselTrack.nativeElement.style.transition = 'transform 0.5s ease-in-out';
      this.carouselTrack.nativeElement.style.transform = `translateX(-${this.slideWidth}px)`;

      setTimeout(() => {
        this.carouselTrack.nativeElement.appendChild(this.carouselTrack.nativeElement.children[0]);
        this.carouselTrack.nativeElement.style.transition = 'none';
        this.carouselTrack.nativeElement.style.transform = 'translateX(0)';
      }, 1000);
    }, 2000);
  }

  ngOnInit(): void {
    this.AllProduct();
    console.log(localStorage.getItem('isAlreadySeller'));
    console.log(this.isAlreadySeller);
    if (localStorage.getItem('isAlreadySeller')=='true') {
      this.isAlreadySeller = true;
    }
    else if (localStorage.getItem('isAlreadySeller') == null) {
      this.checkSeller();
    }
    else {
      this.isAlreadySeller = false;
    }


    this.loadAllProducts();



  }


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  viewProfile() {
    console.log(this.isAlreadySeller);
    if(this.isAlreadySeller){
      this.route.navigate(['profile']);
    }
    if(!this.isAlreadySeller){
      this.snackBar.open("This is seller's profile, only appear when you are a seller!", 'Close', {
        duration: 3000,
        horizontalPosition: 'right', // Position horizontally
        verticalPosition: 'top' // Position vertically
      });
    }
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
    this.form.reset();
    this.otpForm.reset();
    this.showOtpForm = false;
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


  getOtp(): void {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      console.log('Email value:', email); // Debugging line

      if(email != localStorage.getItem('userEmail')){
        this.snackBar.open('Please enter same email via which you have Loged In!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right', // Position horizontally
          verticalPosition: 'top' // Position vertically
        });
      }
      else{
          this.myService.sendOtp(email).subscribe({
            next: (response) => {
              // Handle the response
              console.log('OTP sent successfully', response);
              this.snackBar.open('OTP sent successfully to the given mail id', 'Close', {
                duration: 3000,
                horizontalPosition: 'right', // Position horizontally
                verticalPosition: 'top' // Position vertically
              });
              this.showOtpForm = true; // Show OTP form
            },
            error: (error) => {
              // Handle errors
              console.error('Error sending OTP', error);
            }
          });
        }
      } else {
        console.log('Form is invalid');
      }

  }


  verifyOtp(): void {
    if (this.otpForm.valid) {
      const otp = this.otpForm.get('otp')?.value;
      const phone = this.otpForm.get('phone')?.value;
      const location = this.otpForm.get('location')?.value;
      const email = localStorage.getItem('userEmail');
  
      if (!email) {
        console.error('Email not found in local storage');
        return;
      }
  
      this.myService.verifyOtp({ otp, email, phone, location }).subscribe({
        next: (response) => {
          console.log('OTP verified successfully', response);
          localStorage.setItem('authToken', response.Sellertoken);
          // Handle successful OTP verification
          this.snackBar.open('OTP verified successfully, Congratulation! You are now a seller', 'Close', {
            duration: 3000,
            horizontalPosition: 'right', // Position horizontally
            verticalPosition: 'top' // Position vertically
          });
          this.closeModal(); // Close the modal on success
          this.isAlreadySeller = true;
          localStorage.setItem('isAlreadySeller', 'true');
          this.route.navigate(['main-page']); // Redirect or take any other action on success
        },
        error: (error) => {
          console.error('Error verifying OTP', error);
          this.snackBar.open('Please enter correct OTP', 'Close', {
            duration: 3000,
            horizontalPosition: 'right', // Position horizontally
            verticalPosition: 'top' // Position vertically
          });
          this.isAlreadySeller = false;
        }
      });
    } else {
      console.log('OTP form is invalid');
    }

  }
  

  checkSeller() {
    this.isLoading = true; // Show spinner

    const email = localStorage.getItem('userEmail');

    // Call the makeSeller API to check if the seller exists
    this.myService.checkSeller({ email }).subscribe(
      sellerResponse => {
        console.log('Seller check response:', sellerResponse);
        if (sellerResponse.exist) {
          this.isAlreadySeller = true;
          console.log('Seller already exists.');
        } else {
          this.isAlreadySeller = false;
          console.log('Seller does not exist.');
        }
        this.isLoading = false; // Hide spinner after receiving the response
      },
      sellerError => {
        this.isAlreadySeller = false;
        console.error('Error checking seller status:', sellerError);
        // Handle errors from the makeSeller API
        this.isLoading = false; // Hide spinner in case of error
      }
    );
  }


  AllProduct() {
    this.isLoading = true; // Show spinner

    this.myService.getproducts()
    .subscribe(
      (response) => {
        console.log(response);
        this.products = response.results; // Store the products
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching products', error);
        this.isLoading = false;
        return of([]); // Return an empty array on error
      }
    )

  }


  loadAllProducts(): void {
    this.myService.getproducts().subscribe(
      (response: any) => {
        this.products = response.results; // Assuming the response is an array of products
        this.filteredProducts = this.products; // Initialize filteredProducts
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }


  searchProducts(): void {
    this.myService.getproducts().pipe(
      map((products: any) => {
        // If both input fields are empty, return all products
        if (!this.productName && !this.collegeName) {
          return products.results;
        }
        // Otherwise, filter products based on input fields
        return products.results.filter((product: { name: string; collegeName: string; }) =>
          (this.productName ? product.name.toLowerCase().includes(this.productName.toLowerCase()) : true) &&
          (this.collegeName ? product.collegeName.toLowerCase().includes(this.collegeName.toLowerCase()) : true)
        );
      })
    ).subscribe(
      (filteredProducts: any[]) => {
        this.filteredProducts = filteredProducts;
        this.products = this.filteredProducts;
        console.log(this.filteredProducts); // You can handle the results as needed (e.g., display in UI)
      },
      error => {
        console.error('Error fetching products', error);

      }
    );
  }


  onInputChange(): void {
    this.searchProducts();
  }


  onProductClick(product: any) {
    console.log('Clicked Product:', product);
    this.productName = product;
    this.isLoading = true; // Show loader

    this.myService.getproducts().pipe(
      map((products: any) => {
        // If the productName is null or empty, return all products
        if (!this.productName) {
          return products.results;
        }
        // Otherwise, filter products based on productName
        return products.results.filter((product: { name: string; }) =>
          product.name.toLowerCase().includes(this.productName.toLowerCase())
        );
      })
    ).subscribe(
      (filteredProducts: any[]) => {
        this.filteredProducts = filteredProducts;
        this.products = this.filteredProducts;
        console.log(this.filteredProducts); // Handle the results as needed (e.g., display in UI)
        this.isLoading = false; // Hide loader after receiving the response
      },
      error => {
        console.error('Error fetching products', error);
        this.isLoading = false; // Hide loader in case of error
      }
    );
  }
}






