import { Component, OnInit } from '@angular/core';
// import { loadTranslations } from '@angular/localize';
import { Router } from '@angular/router';
import { SignupCreateAccountService } from '../signup-create-account.service';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  constructor(private router: Router, private myService: SignupCreateAccountService,  private snackBar: MatSnackBar, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.onClick();
  }
  selllerEmail = localStorage.getItem('userEmail');
  products : any[] = [];
  isModalVisible = false;

  onClick() {
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

  closeModal(){
    this.isModalVisible = false;
  }


  editProduct(productId: string) {
    // Fetch product data based on productId
    const product = this.getProductById(productId);

    const dialogRef = this.dialog.open(ProductEditModalComponent, {
      width: '100%',
      data: { product }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Product updated:', result);
        // Handle product update logic
      }
    });
  }

  getProductById(id: string) {
    // Replace this with your actual logic to fetch product data
    return {
      name: 'Sample Product',
      price: 19.99,
      description: 'Sample description',
      collegeName: 'College A',
      location: 'Sample Location'
    };
  }

  deleteId : any;

  deleteProduct(id:any){
    console.log(id);
    this.isModalVisible = true;
    this.deleteId = id;
  }


  cancelDelete() {
    this.isModalVisible = false;
  }

  confirmDelete() {
    console.log(this.deleteId);
    console.log(this.selllerEmail);

    const reqBody = {
      productId : this.deleteId,
      email : this.selllerEmail
    }

    this.myService.deleteProduct(reqBody).subscribe(
      (res:any) => {
        console.log(res);
        this.snackBar.open('Product deleted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right', // Position horizontally
          verticalPosition: 'top' // Position vertically
        });
        this.onClick();
        this.router.navigate(['profile']);
        this.closeModal();
        
      },
      (err:any) => {
        console.log(err);
        this.snackBar.open('Error in deleting product!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right', // Position horizontally
          verticalPosition: 'top' // Position vertically
        });
        this.onClick();
        this.router.navigate(['profile']);
        this.closeModal();
      }
    )
  }
  

  
}
