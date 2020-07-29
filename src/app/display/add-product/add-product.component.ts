import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import  axios from 'axios'
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  product: any;
  constructor(private fb: FormBuilder, private snackbar: MatSnackBar) { }
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
    "category" : '',    
    "expiryDate" : ''
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
    },
    "expiryDate" : {
      "required" : "Expiry date required"
    }
  }
  createForm() {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],      
      expiryDate: ['', [Validators.required]]
    })
    this.productForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.productForm) {
      return;
    }
    const form = this.productForm;
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
  saveProduct() {
    this.product = this.productForm.value;
    this.snackbar.open("Peoduct added successfully", '', {
      duration: 2000,
      panelClass: ['custom-style'],
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    })
    console.log(this.product);
    
    this.createForm();
  }
}
