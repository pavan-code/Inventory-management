import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProductsTableDataSource, ProductsTableItem } from './products-table-datasource';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangeProductDialogComponent } from '../../change-product-dialog/change-product-dialog.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProductsTableItem>;
  dataSource: ProductsTableDataSource;
  newProduct: any = {};
  constructor(private snackbar: MatSnackBar,
              private _dialog: MatDialog
    ) {}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'price', 'quantity', 'actions'];

  ngOnInit() {
    this.dataSource = new ProductsTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  editProduct(product: any) {
    // console.log(product);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data : product
    }
    dialogConfig.disableClose = true;
    dialogConfig.position = {
      top: '60px'
    }
    let dialogRef = this._dialog.open(ChangeProductDialogComponent, dialogConfig);
    dialogRef.afterClosed()
    .subscribe(result => {
      this.newProduct = result;
      // console.log(this.newProduct);      
    })
  }
  
  deleteProduct(productId: number) {
    // console.log(productId);
    this.snackbar.open("Product deleted successfully", '', {
      duration: 2000,
      horizontalPosition:"center",
      verticalPosition: "bottom",
      panelClass: ['custom-style']
      
    })

  }
}
