import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.scss']
})
export class ProductEditModalComponent {
  productForm: FormGroup;
  colleges: string[] = ['College A', 'College B', 'College C']; // Example colleges

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.fb.group({
      name: [data.product.name, [Validators.required, Validators.minLength(3)]],
      price: [data.product.price, [Validators.required, Validators.min(0)]],
      description: [data.product.description, [Validators.required, Validators.minLength(10)]],
      collegeName: [data.product.collegeName, [Validators.required]],
      location: [data.product.location, [Validators.required]],
      image: [null, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      // Handle form submission logic
      console.log(this.productForm.value);
      this.dialogRef.close(this.productForm.value);
    }
  }

  onFileChange(event: any) {
    // Handle file change logic
  }

  goBack() {
    this.dialogRef.close();
  }

  viewMyProducts() {
    // Handle view my products logic
  }
}
