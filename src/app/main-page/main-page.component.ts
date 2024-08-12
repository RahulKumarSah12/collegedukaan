import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupCreateAccountService } from '../signup-create-account.service';
import { catchError, finalize, map, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  productName: string = '';
  collegeName: string = '';
  filteredProducts: any[] = [];

  isLoading = false;

  constructor(private route: Router, private myService: SignupCreateAccountService, private snackBar: MatSnackBar, private renderer: Renderer2) { }
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
      (response: any[]) => {
        console.log(response);
        this.products = response; // Store the products
        console.log("Rahul");
        console.log(this.products);
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
        this.products = response; // Assuming the response is an array of products
        this.filteredProducts = this.products; // Initialize filteredProducts
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }


  searchProducts(): void {
    this.myService.getproducts().pipe(
      map((products: any[]) => {
        // If both input fields are empty, return all products
        if (!this.productName && !this.collegeName) {
          return products;
        }
        // Otherwise, filter products based on input fields
        return products.filter(product =>
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
      map((products: any[]) => {
        // If the productName is null or empty, return all products
        if (!this.productName) {
          return products;
        }
        // Otherwise, filter products based on productName
        return products.filter(product =>
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






