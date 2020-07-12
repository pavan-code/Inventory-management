import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-category-dialog',
  templateUrl: './change-category-dialog.component.html',
  styleUrls: ['./change-category-dialog.component.scss']
})
export class ChangeCategoryDialogComponent implements OnInit {
  changeCategory: FormGroup;
  categoryName : any;

  constructor(private _fb: FormBuilder,
              private dialogRef: MatDialogRef<ChangeCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private snackbar: MatSnackBar
    ) {  this.categoryName = data }

  ngOnInit(): void {
    this.createForm();
    this.changeCategory = this._fb.group({
      categoryName : [this.categoryName.categoryName, []]
    })
  }

  createForm() {
    this.changeCategory = this._fb.group({
      categoryName: ['', [Validators.required]]
    })
  }
  saveChanges() {
    this.dialogRef.close(this.changeCategory.value);
    if(this.categoryName.type == 'add') {

      this.snackbar.open("Category added successfully", "", {
        duration: 2000,
        panelClass: ["custom-style"],
        horizontalPosition: 'center',
        verticalPosition: 'top',
        
      })
    }
    else {
      this.snackbar.open("Category updated successfully", "", {
        duration: 2000,
        panelClass: ["custom-style"],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    }
  }

}
