import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';

//======================================== material modules==========================

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

// ==================================================================================

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DisplayModule } from './display/display-page.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderComponent } from './order/order.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { OrdersTableComponent } from './add-order/orders-table/orders-table.component';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { ManageOrdersTableComponent } from './manage-orders/manage-orders-table/manage-orders-table.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    ForgotPasswordPageComponent,
    HomePageComponent,
    SignUpComponent,
    PageNotFoundComponent,
    OrderComponent,
    AddOrderComponent,
    ManageOrdersComponent,
    OrdersTableComponent,
    AddProductDialogComponent,
    ManageOrdersTableComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    DisplayModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  exports: [MatButtonModule],
  providers: [
    // GetBrandsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
