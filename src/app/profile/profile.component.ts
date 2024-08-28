import { Component, OnInit } from '@angular/core';
// import { loadTranslations } from '@angular/localize';
import { Router } from '@angular/router';
import { SignupCreateAccountService } from '../signup-create-account.service';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  colleges: string[] =
    [
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

  editProductForm: FormGroup;

  isEditModalVisible = false;

  constructor(private router: Router, private myService: SignupCreateAccountService, private snackBar: MatSnackBar, private dialog: MatDialog, private fb: FormBuilder) {
    this.editProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      collegeName: ['', Validators.required],
      location: ['', Validators.required],
      image: [null]
    });
  }
  ngOnInit(): void {
    this.getSellerProductsList();
  }
  sellerEmail = localStorage.getItem('userEmail');
  products: any[] = [];
  isModalVisible = false;

  getSellerProductsList() {
    const email = localStorage.getItem('userEmail');

    if (email) {
      this.myService.getallMyProducts({ email }).subscribe(
        async (res: any) => {
          console.log(res.results);
          this.products = res.results;
        },
        (err: any) => {
          console.error('Error fetching products', err);
          return of([]);
        }
      );
    }
  }


  goBack(): void {
    this.router.navigate(['main-page']);
  }

  closeModal() {
    this.isModalVisible = false;
  }

  deleteId: any;

  deleteProduct(id: any) {
    console.log(id);
    this.isModalVisible = true;
    this.deleteId = id;
  }


  cancelDelete() {
    this.isModalVisible = false;
  }

  confirmDelete() {
    console.log(this.deleteId);
    console.log(this.sellerEmail);

    const reqBody = {
      productId: this.deleteId,
      email: this.sellerEmail
    }

    this.myService.deleteProduct(reqBody).subscribe(
      (res: any) => {
        console.log(res);
        this.snackBar.open('Product deleted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right', // Position horizontally
          verticalPosition: 'top' // Position vertically
        });
        this.getSellerProductsList();
        this.router.navigate(['profile']);
        this.closeModal();

      },
      (err: any) => {
        console.log(err);
        this.snackBar.open('Error in deleting product!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right', // Position horizontally
          verticalPosition: 'top' // Position vertically
        });
        this.getSellerProductsList();
        this.router.navigate(['profile']);
        this.closeModal();
      }
    )
  }



  toBeEditId: any;
  imageUrl: any;
  async openEditModal(product: any, id: any) {
    console.log(product);
    console.log(id);
    this.toBeEditId = id;
    this.isEditModalVisible = true;
  
    // Patch the form with other values
    this.editProductForm.patchValue({
      name: product.name,
      price: product.price,
      description: product.description,
      collegeName: product.collegeName,
      location: product.location,
    });
  
    // Save the image URL for later use
    this.imageUrl = product.image;
  }

  closeEditModal() {
    this.isEditModalVisible = false;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      // Only patch the form value
      this.editProductForm.patchValue({
        image: file
      });
      this.editProductForm.get('image')?.updateValueAndValidity();
    }
  }

  onSave() {
    console.log(this.editProductForm.value);
    const sellerEmail = localStorage.getItem('userEmail');
    const productId = this.toBeEditId;
    const formData = new FormData();
  
    // Append file
    const imgfile = this.editProductForm.get('image')?.value;
    console.log(imgfile);
    if (imgfile) {
      // Append the image URL directly if no file is selected
      formData.append('file', imgfile);
    }
    else{
      
    }
  
    // Append form fields except the file separately
    formData.append('name', this.editProductForm.get('name')?.value);
    formData.append('description', this.editProductForm.get('description')?.value);
    formData.append('price', this.editProductForm.get('price')?.value.toString());
    formData.append('collegeName', this.editProductForm.get('collegeName')?.value);
    formData.append('location', this.editProductForm.get('location')?.value);
    formData.append('productId', productId);
  
    if (sellerEmail) {
      formData.append('email', sellerEmail);
    }

    console.log(formData);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    this.myService.updateProduct(formData).subscribe(
      response => {
        console.log('Product updated successfully:', response);
        this.snackBar.open('Product updated successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.router.navigate(['profile']);
        this.closeEditModal();
        this.getSellerProductsList();
      },
      error => {
        console.error('Error updating product:', error);
        this.snackBar.open('Error updating product', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    );
  }



  // async onSave() {
  //   const sellerEmail = localStorage.getItem('userEmail');
  //   const productId = this.toBeEditId;
  //   const formData = new FormData();
  
  //   // Check if an image is selected in the form
  //   const imgfile = this.editProductForm.get('image')?.value;
  //   console.log(imgfile);

  //   if (imgfile) {
  //     formData.append('file', imgfile);
  //     console.log(imgfile);
  //   }
  //   else{
  //     try {
  //       console.log(this.imageUrl);
  //       // Fetch the image from the URL and convert it to a Blob only if no new image is selected
        
  //       const response = await fetch(this.imageUrl, { mode: 'cors' });
  //       const blob = await response.blob();
       
  //       console.log("Blob");
  //       console.log(blob);

  //       // Extract the image name from the URL
  //       const fullImageName = this.imageUrl.split('/').pop();
  //       const imageName = fullImageName?.split('-').pop();
  
  //       // Create a default File object from the Blob
  //       let defaultFile = new File([blob], imageName || 'image.png', { type: blob.type });
  //       console.log("Default");
  //       console.log(defaultFile);
  
  //       formData.append('file', defaultFile);
  //     } catch (error) {
  //       console.error('Error fetching image:', error);
  //       this.snackBar.open('Error fetching the image. Please try again.', 'Close', {
  //         duration: 3000,
  //         horizontalPosition: 'right',
  //         verticalPosition: 'top',
  //       });
  //       return; // Exit the function if there's an error
  //     }
  //   }
  

  
  //   // Append form fields except the file separately
  //   formData.append('name', this.editProductForm.get('name')?.value);
  //   formData.append('description', this.editProductForm.get('description')?.value);
  //   formData.append('price', this.editProductForm.get('price')?.value.toString());
  //   formData.append('collegeName', this.editProductForm.get('collegeName')?.value);
  //   formData.append('location', this.editProductForm.get('location')?.value);
  //   formData.append('productId', productId);
  
  //   if (sellerEmail) {
  //     formData.append('email', sellerEmail);
  //   }
  
  //   this.myService.updateProduct(formData).subscribe(
  //     response => {
  //       console.log('Product updated successfully:', response);
  //       this.snackBar.open('Product updated successfully!', 'Close', {
  //         duration: 3000,
  //         horizontalPosition: 'right',
  //         verticalPosition: 'top'
  //       });
  //       this.router.navigate(['profile']);
  //       this.closeEditModal();
  //       this.getSellerProductsList();
  //     },
  //     error => {
  //       console.error('Error updating product:', error);
  //       this.snackBar.open('Error updating product', 'Close', {
  //         duration: 3000,
  //         horizontalPosition: 'right',
  //         verticalPosition: 'top'
  //       });
  //     }
  //   );
  // }




}
