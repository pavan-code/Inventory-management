import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private _fb: FormBuilder) { this.createForm(); }

  loginForm: FormGroup;
  ngOnInit(): void {
  }

  formErrors = {
    "username": '',
    'password': ''
  }

  validationMsgs = {
    "username" : {
      'required': "Username is required"
  },
    "password": {
      'required': "password is required"
    }
  }
  createForm() {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
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
    window.location.reload();
  }


}
