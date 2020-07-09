import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';

//======================================== material modules==========================

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDividerModule } from '@angular/material/divider'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CdkTableModule } from '@angular/cdk/table';
// import { DataSource } from '@angular/cdk/table'

// ==================================================================================

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DisplayModule } from './display/display-page.module';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    ForgotPasswordPageComponent,
    HomePageComponent,
    DataTableComponent,
    
  ],
  imports: [
    BrowserModule,    AppRoutingModule,    BrowserAnimationsModule,    MatButtonModule,
    MatIconModule,    MatToolbarModule,      
    MatInputModule,    MatFormFieldModule,    FormsModule,    ReactiveFormsModule,
    MatDividerModule,    MatCheckboxModule,    MatSidenavModule,    MatListModule,    
    DisplayModule,     CdkTableModule, MatTableModule, MatPaginatorModule, MatSortModule

  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
