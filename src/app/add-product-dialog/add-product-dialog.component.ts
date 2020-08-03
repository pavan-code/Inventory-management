import { Component, OnInit, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {

  products = [];
  product: string;
  quantity : number;
  addProduct: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.products = data.name;  
    this.product= data.product;    
    this.quantity = data.quantity
  }

  ngOnInit(): void {
    this.createForm();
    this.addProduct = this.fb.group({
      name: [this.product, [Validators.required]],
      quantity : [this.quantity, [Validators.required]]
    })
    this.addProduct.valueChanges.subscribe(data => this.onValueChanged(data))
    this.onValueChanged();
  }
  createForm() {
    this.addProduct = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    })
    this.addProduct.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  formErrors = {
    'name':'',
    'quantity': ''
  }
  validationMsgs = {
    'name' : {
      'required' : "Choose one product name"
    },
    "quantity" : {
      'required' : "Enter the quantity"
    }
  }
  onValueChanged(data?:any) {
    if (!this.addProduct) {
      return;
    }
    const form = this.addProduct;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previuos error messages if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMsgs[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }
  saveChanges() {
    this.dialogRef.close(this.addProduct.value);
  }

}
