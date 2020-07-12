import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CategoryTableDataSource, CategoryTableItem } from './category-table-datasource';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangeCategoryDialogComponent } from '../../change-category-dialog/change-category-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CategoryTableItem>;
  dataSource: CategoryTableDataSource;

  updatedCategory : any;

  constructor(private _dialog: MatDialog, private snackbar: MatSnackBar) {}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'actions'];

  ngOnInit() {
    this.dataSource = new CategoryTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  editCategory(event: any) {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.position = {
      top: '30px'
    }
    dialogConfig.data = {
      categoryName: event,
      type: 'edit'
    }

    let dialogRef = this._dialog.open(ChangeCategoryDialogComponent, dialogConfig);
    dialogRef.afterClosed()
    .subscribe(result => {
      this.updatedCategory = result;
    })
  }

  deleteCategory(categoryName: string) {
    this.snackbar.open("Category deleted successfully", '', {
      duration: 2000,
      panelClass: ['custom-style'],
      
      verticalPosition: 'top',
      horizontalPosition: 'center'
    })
  }
}
