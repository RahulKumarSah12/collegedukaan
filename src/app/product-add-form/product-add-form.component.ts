import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupCreateAccountService } from '../signup-create-account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-add-form',
  templateUrl: './product-add-form.component.html',
  styleUrls: ['./product-add-form.component.scss']
})
export class ProductAddFormComponent {
  productForm!: FormGroup;
  colleges: string[] = [];

  constructor(private fb: FormBuilder, private router: Router, private myService: SignupCreateAccountService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(10)]],
      collegeName: ['', [Validators.required]],
      location: ['', [Validators.required]],
      image: ['', Validators.required]
    });


    // Fetch or set the list of colleges (static example here)
    this.colleges = [
      // Indian Institutes of Technology (IITs)
      'IIT Bombay',
      'IIT Delhi',
      'IIT Kanpur',
      'IIT Kharagpur',
      'IIT Madras',
      'IIT Roorkee',
      'IIT Guwahati',
      'IIT Hyderabad',
      'IIT Jodhpur',
      'IIT Patna',
      'IIT Ropar',
      'IIT Bhubaneswar',
      'IIT Gandhinagar',
      'IIT Mandi',
      'IIT ISM Dhanbad',
      'IIT Varanasi',
      'IIT Palakkad',
      'IIT Tirupati',
      'IIT Bhilai',
      'IIT Dharwad',
      'IIT Jammu',

      // National Institutes of Technology (NITs)
      'NIT Warangal',
      'NIT Trichy',
      'NIT Surathkal',
      'NIT Rourkela',
      'NIT Calicut',
      'NIT Durgapur',
      'NIT Kurukshetra',
      'NIT Jamshedpur',
      'NIT Silchar',
      'NIT Hamirpur',
      'NIT Meghalaya',
      'NIT Puducherry',
      'NIT Arunachal Pradesh',
      'NIT Delhi',
      'NIT Mizoram',
      'NIT Sikkim',
      'NIT Agartala',
      'NIT Jalandhar',
      'NIT Rourkela',
      'NIT Uttarakhand',

      // Indian Institutes of Information Technology (IIITs)
      'IIIT Allahabad',
      'IIIT Bangalore',
      'IIIT Design and Manufacturing, Kancheepuram',
      'IIIT Hyderabad',
      'IIIT Jabalpur',
      'IIIT Kalyani',
      'IIIT Kota',
      'IIIT Lucknow',
      'IIIT Manipur',
      'IIIT Mangalore',
      'IIIT Raichur',
      'IIIT Pune',
      'IIIT Sri City',
      'IIIT Una',
      'IIIT Vadodara',
      'IIIT Chittoor',
      'IIIT Surat',
      'IIIT Dharwad',
      'IIIT Bhopal',
      'IIIT Kancheepuram'
    ];

  }

  onSubmit(): void {
    const sellerEmail = localStorage.getItem('userEmail');
    if (this.productForm.valid) {
      const formData = new FormData();
      console.log(this.productForm.value);

      // Append file
      const imgfile = this.productForm.get('image')?.value;
      console.log(imgfile);
      if (imgfile) {
        formData.append('file', imgfile);
      }

      // Append form fields except the file separately
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value.toString());
      formData.append('collegeName', this.productForm.get('collegeName')?.value);
      formData.append('location', this.productForm.get('location')?.value);

      if (sellerEmail) {
        formData.append('email', sellerEmail);
      }


      // Send form data using the service
      this.myService.addProduct(formData).subscribe(
        response => {
          console.log("Rahul");
          console.log('Product added successfully:', response);
          this.snackBar.open('Product added successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right', // Position horizontally
            verticalPosition: 'top' // Position vertically
          });
          this.router.navigate(['main-page']);
        },
        error => {
          console.error('Error adding product:', error);
          this.snackBar.open('Error adding product', 'Close', {
            duration: 3000,
            horizontalPosition: 'right', // Position horizontally
            verticalPosition: 'top' // Position vertically
          });
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
    this.router.navigate(['/profile']); // Adjust this path based on your routing
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      // Only patch the form value
      this.productForm.patchValue({
        image: file
      });
      this.productForm.get('image')?.updateValueAndValidity();
    }
  }

}
