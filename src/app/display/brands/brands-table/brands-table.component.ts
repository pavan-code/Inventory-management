import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BrandsTableDataSource, BrandsTableItem } from './brands-table-datasource';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangeBrandDialogComponent } from '../../change-brand-dialog/change-brand-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-brands-table',
  templateUrl: './brands-table.component.html',
  styleUrls: ['./brands-table.component.scss']
})
export class BrandsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<BrandsTableItem>;
  dataSource: BrandsTableDataSource;
  updatedBrand: any;

  constructor(private _dialog: MatDialog, private snackbar: MatSnackBar ) {}

  displayedColumns = ['id', 'name', 'actions'];

  ngOnInit() {
    this.dataSource = new BrandsTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  editBrand(event: any) {
    // alert(event);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.backdropClass = 'background'
    dialogConfig.data = {
      brandName : event,
      type: 'edit'
    }
    dialogConfig.position = {
      top: '60px'
    }
    let dialogRef = this._dialog.open(ChangeBrandDialogComponent, dialogConfig);
    dialogRef.afterClosed()
    .subscribe(result => {
      this.updatedBrand = result;
    })
  }

  deleteBrand(brandname: string) {
    // alert(brandname)
    this.snackbar.open("Brand deleted successfully", '', {
      duration: 2000,
      panelClass: ['custom-style'],
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    })
  }
}
