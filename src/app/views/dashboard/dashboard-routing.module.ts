import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [  
  { path: '', component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },          
          {path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)},
      {path: 'customers', loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersModule)}, 
    ],
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
