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

  ngOnInit(): void {
    this.createForm();
    // alert(this.brandName.brandName)
    this.changeBrand = this.fb.group({
      brandName: [this.brandName.brandName, []]
    })
  }

  createForm() {
    this.changeBrand = this.fb.group({
      brandName: ['', [Validators.required]],

    })
  }
  saveChanges() {

    // alert("changes saved successfully!!");
    this.dialogRef.close(this.changeBrand.value);
    if(this.brandName.type == 'add') {

      this.snackbar.open("Brand added successfully", "", {
        duration: 2000,
        panelClass: ['custom-style'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    }
    else {
      this.snackbar.open("Brand updated successfully", "", {
        duration: 2000,
        panelClass: ['custom-style'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    }
  }
}
