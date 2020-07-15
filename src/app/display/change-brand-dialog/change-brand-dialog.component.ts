import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-brand-dialog',
  templateUrl: './change-brand-dialog.component.html',
  styleUrls: ['./change-brand-dialog.component.scss']
})
export class ChangeBrandDialogComponent implements OnInit {

  constructor(private fb: FormBuilder, 
              private dialogRef: MatDialogRef<ChangeBrandDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private snackbar: MatSnackBar) {
                this.brandName = data;
               }

  changeBrand: FormGroup;
  brandName: any;
  formErrors = {
    "brandName" : ''
  }
  validationMsgs = {
    "brandName" : {
      "required" : "Brand name is required"
    }
  }
  ngOnInit(): void {
    this.createForm();
    // alert(this.brandName.brandName)
    this.changeBrand = this.fb.group({
      brandName: [this.brandName.brandName, [Validators.required]]
    })
    this.changeBrand.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  createForm() {
    this.changeBrand = this.fb.group({
      brandName: ['', [Validators.required]],

    })
    this.changeBrand.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.changeBrand) {
      return;
    }
    const form = this.changeBrand;
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

    // alert("changes saved successfully!!");
    this.dialogRef.close(this.changeBrand.value);
    if(this.brandName.type == 'add') {

      this.snackbar.open("Brand added successfully", "", {
        duration: 2000,
        panelClass: ['custom-style'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    }
    else {
      this.snackbar.open("Brand updated successfully", "", {
        duration: 2000,
        panelClass: ['custom-style'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    }
  }
}
