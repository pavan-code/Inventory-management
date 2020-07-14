import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-product-dialog',
  templateUrl: './change-product-dialog.component.html',
  styleUrls: ['./change-product-dialog.component.scss'],
})
export class ChangeProductDialogComponent implements OnInit {
  updateProduct: FormGroup;
  product: any;
  

  constructor(
    private snackbar: MatSnackBar,
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<ChangeProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) Data
  ) {
    this.product = Data.data;
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.updateProduct = this._fb.group({
      productName: [this.product.name, [Validators.required]],
      price: [this.product.price, [Validators.required]],
      quantity: [this.product.quantity, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      category: [this.product.category, [Validators.required]],
      brand: [this.product.brand, [Validators.required]],
    });
  }
  get() {
    return this.updateProduct.get('productName')
  }
  saveChanges() {
    this.dialogRef.close(this.updateProduct.value);
    this.snackbar.open("Product updated successfully", '', {
      duration: 2000,
      panelClass: ['custom-style']
    })
  }
}
