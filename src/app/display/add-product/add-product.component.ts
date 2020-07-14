import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      brand: ['', [Validators.required]]
    })
  }
  saveProduct() {
    this.snackbar.open("Peoduct added successfully", '', {
      duration: 2000,
      panelClass: ['custom-style'],
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    })
    this.productForm.reset();
  }
}
