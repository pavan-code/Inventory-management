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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

// ==================================================================================

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DisplayModule } from './display/display-page.module';



// import { GetBrandsService } from './services/get-brands.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    ForgotPasswordPageComponent,
    HomePageComponent,    
  ],
  imports: [
    BrowserModule,    AppRoutingModule,    BrowserAnimationsModule,    MatButtonModule,
    MatIconModule,    MatToolbarModule,      
    MatInputModule,    MatFormFieldModule,    FormsModule,    ReactiveFormsModule,
    MatDividerModule,    MatCheckboxModule,    MatSidenavModule,    MatListModule,    
    DisplayModule,     CdkTableModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatDialogModule,  MatExpansionModule,   MatMenuModule,  MatSelectModule

  ],
  exports:[
    MatButtonModule
  ],
  providers: [
    // GetBrandsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
