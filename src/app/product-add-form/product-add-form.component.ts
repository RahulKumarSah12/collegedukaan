import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupCreateAccountService } from '../signup-create-account.service';

@Component({
  selector: 'app-product-add-form',
  templateUrl: './product-add-form.component.html',
  styleUrls: ['./product-add-form.component.scss']
})
export class ProductAddFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private myService: SignupCreateAccountService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(10)]],
      stock: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      this.myService.addProduct(token,productData).subscribe(
        response => {
          console.log('Product added successfully:', response);
          // Handle successful response
        },
        error => {
          console.error('Error adding product:', error);
          // Handle error response
        }
      );
    } else {
      console.log('Form is invalid');
    }
  
  }

  goBack(): void {
    this.router.navigate(['/main-page']); // Adjust this path based on your routing
  }

  viewMyProducts(): void {
    this.router.navigate(['/my-products']); // Adjust this path based on your routing
  }

}
