import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EditCustomersComponent } from './edit-customers/edit-customers.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'customers-list', component: CustomerListComponent },
  { path: 'edit-customers', component: EditCustomersComponent }
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
