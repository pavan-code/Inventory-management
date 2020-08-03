import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';

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
  categories : string[] = [];

  ngOnInit(): void {
    this.createForm(); 
    var userid = localStorage.getItem('userid');
    var token = localStorage.getItem("token");

    axios({
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      method: 'get',
      url: `https://inventory-shop-api.herokuapp.com/category/${userid}`,
    })
      .then((response) => {         
        response.data.message.filter(cat => {
          this.categories.push(cat.name)
        })                                              
      })   
      .catch((error) => {        
        this.snackbar.open(error.response.data.message, '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })                
      }); 

  }
  formErrors =  {
    "productName" : '',
    "price" : '',
    "quantity": '',
    "description" : '',
    "category" : ''    
  }
  validationMsgs = {
    "productName" : {
      "required" : "Product name is required",
      "minlength" : "Minimum length should be 3 characters long"
    },
    "price" : {
      "required" : "price is required"
    },
    "quantity" : {
      "required" : "Quantity is required"
    },
    "description" : {
      "required" : "Description is required"
    },
    "category" : {
      "required" : "Please select one category"
    }
  }
  createForm() {
    this.updateProduct = this._fb.group({    
      productName: [this.product.name, [Validators.required, Validators.minLength(3)]],
      price: [this.product.price, [Validators.required]],
      quantity: [this.product.quantity, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      category: [this.product.category, [Validators.required]],
      
    });
    this.updateProduct.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.updateProduct) {
      return;
    }
    const form = this.updateProduct;
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
    this.dialogRef.close(this.updateProduct.value);
    this.snackbar.open("Product updated successfully", '', {
      duration: 2000,
      panelClass: ['custom-style']
    })
  }
}
