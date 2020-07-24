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
  hidden: boolean = false;

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
      remember: [false]
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
    
    this.hidden = true;
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
      this.hidden = false;
      var token = response.data.message.salt

      var date = new Date();
  
      date.setTime(date.getTime()+(5*60*60*1000));
  
      var expires =  "expires=" + date.toUTCString();
  
      document.cookie = "token" + "=" + token + ";" + expires + ";path=/";

      console.log(response.data.message)
      this.loginForm.reset();

      this.snackbar.open("Login Successful", '', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })      
      location.href = '/home';
      
    })
    .catch( (error) => {
      this.hidden = false;
      
      
      console.log(error.response.data.message);
      
      this.snackbar.open(error.response.data.message, 'close', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
      this.loginForm.reset();
    })
  }


}
