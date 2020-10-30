import { Component, OnInit } from '@angular/core';
import {FormControl,FormsModule, ReactiveFormsModule,FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core';
import { UserService } from 'src/app/core/_services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {} from 'google-maps';
declare var $;


declare var google: any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
  
  
})

export class CustomersComponent implements OnInit {
  selectedOptionCountry = "1";
  selectedOptionCity = "1";
  selectedOptionState="1";
  control = new FormControl();
  companies: string[] = ['innovative-india', 'innovative', 'Amazon', 'Wipro'];
  filteredCompany: Observable<string[]>;
 /* myGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email:  new FormControl(),
    description :  new FormControl(),
    phone: new FormControl(),
 });*/

 getuserinfo;
 myGroup: FormGroup;



  constructor(private _router: Router,
    private service: UserService,
    private formBuilder: FormBuilder,
    private _notify: NotificationService,
    private modalService: NgbModal) { 

      //Form group 
      this.myGroup = this.formBuilder.group({
        name: [''],
        email:[''],
        mobile:[''],
        notes:[''],
        address:[''],
        state:[''],
        country:[''],
        city:[''],
        zip_code:['']
      })
    }
     
  
   ngOnInit(){

    //get local user information
    this.getuserinfo = JSON.parse(localStorage.getItem('user'));
    console.log(this.getuserinfo);
   
    //Auto compelete for Company
    this.filteredCompany = this.control.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

}
//Filtering
private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.companies.filter(company => company.toLowerCase().includes(filterValue));

}
//ON submit form
  submitForm() {
   
    //Json Object
    var data={"user_id":this.getuserinfo.id,"user_shop_id":this.getuserinfo.shopData.id,"name": this.myGroup.get('name').value,"email": this.myGroup.get('email').value,"mobile":this.myGroup.get('mobile').value,"address":this.myGroup.get('address').value,"city":this.myGroup.get('city').value,"country":this.myGroup.get('country').value,"state":this.myGroup.get('state').value,"zip_code":this.myGroup.get('zip_code').value}

    //Calling API
    this.service.addCustomers(data).subscribe(
      (response) =>{
        if(response.status=="success"){
          this._router.navigateByUrl("/dashboard/customers/customers-list");
        }
      },
      (error) => console.log(error)
    )
    
  }

  



  
  
} 












