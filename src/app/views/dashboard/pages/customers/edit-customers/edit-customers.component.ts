import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core';
import { UserService } from 'src/app/core/_services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
declare var $;

@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.scss']
})
export class EditCustomersComponent implements OnInit {
  getuserinfo;

  editForm: FormGroup;
customerData:any={}

  constructor(private _router: Router,
    private service: UserService,
    private formBuilder: FormBuilder,
    private _notify: NotificationService,
    private modalService: NgbModal) { 
      
  
    }

  async ngOnInit() {
    //get user information
    this.getuserinfo = JSON.parse(localStorage.getItem('user'));
    console.log(this.getuserinfo);
    //get the customer's information 
    this.customerData=JSON.parse(sessionStorage.getItem('cust'));
    
    //Form group method
    this.editForm = this.formBuilder.group({
      name: [this.customerData.name],
      email:[this.customerData.email],
      address:[this.customerData.address],
      notes:[this.customerData.notes],
      city:[this.customerData.city],
      state:[this.customerData.state],
      country:[this.customerData.country],
      zip_code:[this.customerData.zip_code]

    })
  }

  //On submit Form function
  submitForm() {
    //Json Object
    var data={id: this.customerData.id,"user_id":this.getuserinfo.id,"user_shop_id":this.getuserinfo.shopData.id,"name": this.editForm.get('name').value,"email": this.editForm.get('email').value,"city":this.editForm.get('city').value,"address":this.editForm.get('address').value,"country":this.editForm.get('country').value,"state":this.editForm.get('state').value,"zip_code":this.editForm.get('zip_code').value}
    console.log(data);
    
    //calling api
    this.service.updateCustomers(data).subscribe(
      (response) =>{
        if(response.status=="success"){
          console.log(response);
          this._router.navigateByUrl("/dashboard/customers/customers-list");
        }
      },
      (error) => console.log(error)
    )

    }

}
