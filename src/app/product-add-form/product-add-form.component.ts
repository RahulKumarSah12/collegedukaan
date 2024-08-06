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
  productForm!: FormGroup;
  colleges: string[] = [];

  constructor(private fb: FormBuilder, private router: Router, private myService: SignupCreateAccountService) {

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
          'Indian Institute of Technology (IIT) Bombay',
          'Indian Institute of Technology (IIT) Delhi',
          'Indian Institute of Technology (IIT) Kanpur',
          'Indian Institute of Technology (IIT) Kharagpur',
          'Indian Institute of Technology (IIT) Madras',
          'Indian Institute of Technology (IIT) Roorkee',
          'Indian Institute of Technology (IIT) Guwahati',
          'Indian Institute of Technology (IIT) Hyderabad',
          'Indian Institute of Technology (IIT) Jodhpur',
          'Indian Institute of Technology (IIT) Patna',
          'Indian Institute of Technology (IIT) Ropar',
          'Indian Institute of Technology (IIT) Bhubaneswar',
          'Indian Institute of Technology (IIT) Gandhinagar',
          'Indian Institute of Technology (IIT) Mandi',
          'Indian Institute of Technology (IIT) (ISM) Dhanbad',
          'Indian Institute of Technology (IIT) Varanasi',
          'Indian Institute of Technology (IIT) Palakkad',
          'Indian Institute of Technology (IIT) Tirupati',
          'Indian Institute of Technology (IIT) Bhilai',
          'Indian Institute of Technology (IIT) Dharwad',
          'Indian Institute of Technology (IIT) Jammu',
        
          // National Institutes of Technology (NITs)
          'National Institute of Technology (NIT) Warangal',
          'National Institute of Technology (NIT) Trichy',
          'National Institute of Technology (NIT) Surathkal',
          'National Institute of Technology (NIT) Rourkela',
          'National Institute of Technology (NIT) Calicut',
          'National Institute of Technology (NIT) Durgapur',
          'National Institute of Technology (NIT) Kurukshetra',
          'National Institute of Technology (NIT) Jamshedpur',
          'National Institute of Technology (NIT) Silchar',
          'National Institute of Technology (NIT) Hamirpur',
          'National Institute of Technology (NIT) Meghalaya',
          'National Institute of Technology (NIT) Puducherry',
          'National Institute of Technology (NIT) Arunachal Pradesh',
          'National Institute of Technology (NIT) Delhi',
          'National Institute of Technology (NIT) Mizoram',
          'National Institute of Technology (NIT) Sikkim',
          'National Institute of Technology (NIT) Agartala',
          'National Institute of Technology (NIT) Jalandhar',
          'National Institute of Technology (NIT) Rourkela',
          'National Institute of Technology (NIT) Uttarakhand',
        
          // Indian Institutes of Information Technology (IIITs)
          'Indian Institute of Information Technology (IIIT) Allahabad',
          'Indian Institute of Information Technology (IIIT) Bangalore',
          'Indian Institute of Information Technology (IIIT) Design and Manufacturing, Kancheepuram',
          'Indian Institute of Information Technology (IIIT) Hyderabad',
          'Indian Institute of Information Technology (IIIT) Jabalpur',
          'Indian Institute of Information Technology (IIIT) Kalyani',
          'Indian Institute of Information Technology (IIIT) Kota',
          'Indian Institute of Information Technology (IIIT) Lucknow',
          'Indian Institute of Information Technology (IIIT) Manipur',
          'Indian Institute of Information Technology (IIIT) Mangalore',
          'Indian Institute of Information Technology (IIIT) Raichur',
          'Indian Institute of Information Technology (IIIT) Pune',
          'Indian Institute of Information Technology (IIIT) Sri City',
          'Indian Institute of Information Technology (IIIT) Una',
          'Indian Institute of Information Technology (IIIT) Vadodara',
          'Indian Institute of Information Technology (IIIT) Chittoor',
          'Indian Institute of Information Technology (IIIT) Surat',
          'Indian Institute of Information Technology (IIIT) Dharwad',
          'Indian Institute of Information Technology (IIIT) Bhopal',
          'Indian Institute of Information Technology (IIIT) Design and Manufacturing, Kancheepuram'
        ];
        
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      console.log(this.productForm.value);
      
      // Append form fields except the file separately
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value.toString());
      formData.append('collegeName', this.productForm.get('collegeName')?.value);
      formData.append('location', this.productForm.get('location')?.value);

      // Append file
      const imageFile = this.productForm.get('image')?.value;
      if (imageFile) {
        formData.append('image', imageFile, imageFile.name);
      }

      console.log(formData);

      // Send form data using the service
      this.myService.addProduct(formData).subscribe(
        response => {
          if (response.msg == "Product already exists") {
            return;
          }
          console.log('Product added successfully:', response);
          this.router.navigate(['main-page']);
        },
        error => {
          console.error('Error adding product:', error);
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
