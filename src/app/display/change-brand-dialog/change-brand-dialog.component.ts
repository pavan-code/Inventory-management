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
              private snackbar: MatSnackBar) { }

  changeBrand: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.changeBrand = this.fb.group({
      brandName: ['', [Validators.required]],

    })
  }
  saveChanges() {

    // alert("changes saved successfully!!");
    this.dialogRef.close(this.changeBrand.value);
    this.snackbar.open("Brand added successfully", "close", {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })

  }
}
