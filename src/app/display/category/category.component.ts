import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { ChangeCategoryDialogComponent } from '../change-category-dialog/change-category-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  result: any;

  constructor(private _dialog: MatDialog) { }

  addCategory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position = {
      top: '60px'
    }
    dialogConfig.data = {
      type: 'add'
    }

    let dialogRef = this._dialog.open(ChangeCategoryDialogComponent, dialogConfig)
    dialogRef.afterClosed()
    .subscribe(result => {
      this.result = result;
    })
  }
}