import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands/brands.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayRoutingModule } from './display-routing.module';
import { BrandsTableComponent } from './brands/brands-table/brands-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CategoryTableComponent } from './category/category-table/category-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule  } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog';
import { ChangeBrandDialogComponent } from './change-brand-dialog/change-brand-dialog.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
  declarations: [BrandsComponent, CategoryComponent, DashboardComponent, BrandsTableComponent, CategoryTableComponent, ChangeBrandDialogComponent],
  entryComponents: [ChangeBrandDialogComponent],
  imports: [
    CommonModule,
    DisplayRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})

export class DisplayModule { }
