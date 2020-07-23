import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import axios from 'axios';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar) { }
  signUpForm : FormGroup;
  formErrors = {
    'firstName' : '',
    'lastName' : '',
    'mailId' : '',
    'contactNo' : '',
    'address' : '',
    'password' : '',
    'jobRole' : '',
    'annualIncome' : ''
  }
  validationMsgs = {
    'firstName' : {
      'required' : "Your first name is required",
      'minlength' : "First name should be atleast 3 characters",
    },
    'lastName' : {
      'required' : "Your last name is required",
      'minlength' : "Last name should be atleast 3 characters"
    },
    'mailId' : {
      'required' : "Email ID is required",
      'email' : "Invalid Email ID"
    },
    'contactNo' : {
      'required' : "Please provide your contact number",
      'pattern' : "Contact number must be 10 digit",    
    },
    'address' : {
      'required' : "Please provide your address" 
    },
    'password' : {
      'required' : "Password is required"
    },
    'jobRole' : {
      'required' : "Select one job role"
    },
    'annualIncome' : {
      'required' : "Annual income is required",
      'pattern' : "Must be a number"
    }
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.signUpForm = this.fb.group({
      firstName: ['surya', [Validators.required, Validators.minLength(3)]],
      lastName: ['pavan', [Validators.required, Validators.minLength(3)]],
      mailId: ['ad@gmail.com', [Validators.required, Validators.email]],
      contactNo: ['9090909090', [Validators.required, Validators.pattern("^[0-9]{10}$"),]],
      address: ['adfas', [Validators.required]],
      password: ['123456', [Validators.required]],
      jobRole: ['', [Validators.required]],
      annualIncome: ['', [ Validators.pattern("^[0-9]*$")]]
    })
    this.signUpForm.valueChanges
    .subscribe(data => this.onValueChanged(data))
  }
  onValueChanged(data ?:any) {
    if (!this.signUpForm) { return; }   
    const form = this.signUpForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {        
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
  signup() {
       
   axios({
      headers : {
          'Content-Type': 'application/json;charset=UTF-8',
      },
      method : 'post',
      url : 'https://inventory-shop-api.herokuapp.com/auth/signup',
      data : { 
        firstname : this.signUpForm.value.firstName,
        lastname: this.signUpForm.value.lastName,
        email : this.signUpForm.value.mailId,
        phone : this.signUpForm.value.contactNo,
        address : this.signUpForm.value.address,
        password : this.signUpForm.value.password,
        annualincome : this.signUpForm.value.annualIncome,
        role : this.signUpForm.value.jobRole
       }
  })
  .then( (response) => {
    console.log(response.data.message)
    this.snackbar.open(response.data.message, 'close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    })
  })
  .catch((error) => {
    // console.log("Hiiii")
    // console.log(error.response.data.message)
    this.snackbar.open(error.response.data.message, 'close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    })
  })
    

  
     
  }
}
