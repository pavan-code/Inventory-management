import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangeBrandDialogComponent } from '../change-brand-dialog/change-brand-dialog.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  result: any;

  constructor(private _dialog: MatDialog) {}

  changeBrand() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    dialogConfig.position = {
      top: '20px',
      
    };
    
    let dialogRef = this._dialog.open(ChangeBrandDialogComponent, {height: '280px', width: '500px'});
    dialogRef.afterClosed()
    .subscribe(result => {
      this.result = result;
    })
  }


}

