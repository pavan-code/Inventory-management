import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private _fb: FormBuilder,
              private snackbar: MatSnackBar) { this.createForm(); }

  loginForm: FormGroup;
  ngOnInit(): void {
  }

  formErrors = {
    "mailId": '',
    'password': ''
  }

  validationMsgs = {
    "mailId" : {
      'required': "Email ID is required",
      'email' : 'Invalid email'
  },
    "password": {
      'required': "password is required",
      'minlength': "password must be atleast 8 characters long"
    }
  }
  createForm() {
    this.loginForm = this._fb.group({
      mailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      remember: false
    });
    this.loginForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data? : any) {
    if (!this.loginForm) { return; }   
    const form = this.loginForm;
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
  submit() {
    axios({
      headers: {
        'Content-type' : 'application/json; charset=UTF-8'
      },
      method: 'post',
      url : 'https://inventory-shop-api.herokuapp.com/auth/signin',
      data : {
        email : this.loginForm.value.mailId,
        password : this.loginForm.value.password
      }
    })
    .then( (response) => {
    
      console.log(response.data.message)
      this.snackbar.open("Login Successful", 'close', {
        duration: 2500,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
    })
    .catch( (error) => {
      console.log(error.response.data.message);
      
      this.snackbar.open(error.response.data.message, 'close', {
        duration: 2500,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
    })
  }


}
