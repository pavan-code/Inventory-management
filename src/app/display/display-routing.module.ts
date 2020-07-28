import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { HomePageComponent } from '../home-page/home-page.component'
import { BrandsComponent } from './brands/brands.component';
import { CategoryComponent } from './category/category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
    { 
        path: 'home', component: HomePageComponent,
        children : [
            
            { path: 'dashboard', component: DashboardComponent },
            { path: 'brands', component: BrandsComponent },
            { path: 'category', component: CategoryComponent },
            { path: 'add-product', component: AddProductComponent },
            { path: 'manage-products', component: ManageProductsComponent },
        ]
    }, 
    { path: '**', component: PageNotFoundComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DisplayRoutingModule { }
  
  