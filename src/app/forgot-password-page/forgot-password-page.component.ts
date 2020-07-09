import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit {

  forgotPassword: FormGroup;

  constructor(private _fb: FormBuilder) {this.createForm(); }

  ngOnInit(): void {
  }
  formErrors = {
    "mailId" : ''
  }
  validationMsgs = {
    "mailId" : {
      "required" : "Mail ID is required",
      "email" : "Invalid mail ID"
    }
  }
  createForm() {
    this.forgotPassword = this._fb.group({
      mailId : ['', [Validators.required, Validators.email]]
    })
    this.forgotPassword.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.forgotPassword) { return; }   
    const form = this.forgotPassword;
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

}
