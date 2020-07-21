import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    "username": '',
    'password': ''
  }

  validationMsgs = {
    "username" : {
      'required': "Username is required",
      "minlength": "Username must be atleast 3 characters long."
  },
    "password": {
      'required': "password is required",
      'minlength': "password must be atleast 8 characters long"
    }
  }
  createForm() {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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
    // alert("logged in ");
    this.snackbar.open("Logged in successfully!!", "close", {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }


}
