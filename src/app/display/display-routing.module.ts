import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { HomePageComponent } from '../home-page/home-page.component'
import { BrandsComponent } from './brands/brands.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
    { 
        path: 'home', component: HomePageComponent,
        children : [
            { path:'', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'brands', component: BrandsComponent },
            { path: 'category', component: CategoryComponent }
        ]
    } 
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DisplayRoutingModule { }
  