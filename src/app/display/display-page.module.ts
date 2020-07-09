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

@NgModule({
  declarations: [BrandsComponent, CategoryComponent, DashboardComponent, BrandsTableComponent, CategoryTableComponent],
  imports: [
    CommonModule,
    DisplayRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class DisplayModule { }
