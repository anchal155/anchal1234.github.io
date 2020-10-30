import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule,FormControl,Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router'; 
import { NotificationService, UserService } from 'src/app/core';
import { environment } from 'src/environments/environment';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';



export interface customerList {
    
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  displayedColumns: string[] = ['select','name','mobile_no','address','Amount Due','action'];

  

  searchKey:any;

  allCustomers;

  dataSource;

  customerData;

  
  @ViewChild(MatSort) sort: MatSort;//Table sorting

  selection = new SelectionModel<any>(true, []); //Selection checkbox

  constructor(private service:UserService,private _route:ActivatedRoute, private router:Router) { }

  async ngOnInit() {

    var user=JSON.parse(localStorage.getItem("user"));//get user information 
    let data =`user_id=${user.id}&shop_id=${user.shopData.id}`
    this.allCustomers = await this.service.getCustomers(data).toPromise();  
    console.log(this.allCustomers);  
    this.dataSource = new MatTableDataSource(this.allCustomers.data);
    this.dataSource.sort = this.sort;

    
  }

  //Filtering function
  applyFilter() {

    this.searchKey = (event.target as HTMLInputElement).value

    this.dataSource.filter = this.searchKey.trim().toLowerCase();

    console.log(this.searchKey);
    
  }

  //Calling edit Function
  editCustomer(customer){
    sessionStorage.setItem("cust",JSON.stringify(customer));
    this.router.navigateByUrl("/dashboard/customers/edit-customers")
    // routerLink="/dashboard/customers/edit-customers"
  }

  deleteCustomer(){
    
      //

    }
    
 //CheckBox method
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
     

}


  

}
