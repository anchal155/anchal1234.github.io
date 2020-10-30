import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {FormsModule,ReactiveFormsModule,FormControl } from '@angular/forms';
import { CustomersComponent } from './pages/customers/customers.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";





@NgModule({
  declarations: [DashboardComponent, SidenavComponent, TopbarComponent, CustomersComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule 
  ]
})
export class DashboardModule { }
