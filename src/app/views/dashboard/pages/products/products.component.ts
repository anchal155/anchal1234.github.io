import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService, UserService } from 'src/app/core';
import { environment } from 'src/environments/environment';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
export interface PeriodicElement {
  position: number;
  product: string;
  sku: number;
  stockqty: number; 
}
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  selectedOptionCat = '1';
  selectedOptionReport = '1';
  
   // mat-table start   
   displayedColumns: string[] = ['select', 'product', 'sku', 'date', 'stockqty', 'stockvalue', 'sellingprice', 'purchaseprice', 'action'];  
   selection = new SelectionModel<any>(true, []);
   @ViewChild(MatSort) sort: MatSort;   
   // end mat-table   
  dataSource
  productList
  constructor(
    private _router: Router,
    private _auth: UserService,    
    private _notify:NotificationService
  ) { }

  async ngOnInit() {  
    var user=JSON.parse(localStorage.getItem("user"));
    let data =`user_id=${user.id}&shop_id=${user.shopData.id}`
    this.productList = await this._auth.getProducts(data).toPromise();  
    console.log(this.productList);  
    this.dataSource = new MatTableDataSource(this.productList);
    this.dataSource.sort = this.sort;
  }
  

   /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();    
  }
  
}
