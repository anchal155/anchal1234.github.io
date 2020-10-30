import { formatCurrency } from '@angular/common';
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
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  getuserinfo
  date = new Date();
  imageSrc: string;
  categoryList
  unitList
  files_array: string[] = [];
  barcodenew
  closeResult: string;
  myControl = new FormControl();
  options: string[] = ['Delhi', 'Mumbai', 'Banglore'];
  filteredOptions: Observable<string[]>;
  codeList = [
    { "value": 'EAN8', "name": 'EAN8', "length": "8" },
    { "value": 'EAN13', "name": 'EAN13', "length": "8" },
    { "value": 'EAN8 Composite Symbology', "name": 'EAN8 Composite Symbology', "length": "8" },
    { "value": 'EAN13 Composite Symbology', "name": 'EAN13 Composite Symbology', "length": "8" },
    { "value": 'UPC-A', "name": 'UPC-A', "length": "12" },
    { "value": 'UPC-E', "name": 'UPC-E', "length": "12" },
    { "value": 'UPC-A Composite Symbology', "name": 'UPC-A Composite Symbology', "length": "12" },
    { "value": 'UPC-E Composite Symbology', "name": 'UPC-E Composite Symbology', "length": "12" },
    { "value": 'CODE128', "name": 'CODE128', "length": "8" },
    { "value": 'codabar', "name": 'codabar', "length": "8" }
  ];
  addProductFormgroup: FormGroup;

  constructor(
    private _router: Router,
    private _auth: UserService,
    private formBuilder: FormBuilder,
    private _notify: NotificationService,
    private modalService: NgbModal
  ) { }

  async ngOnInit() {
    //this._notify.showSuccess("ADD PRODUCT PAGE", "Success")    
    this.getuserinfo = JSON.parse(localStorage.getItem('user'));
    this.getCategory();
    this.unitList = await this._auth.getUnits().toPromise();
    this.addProductFormValue()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
 getCategory(){
  var user = 'user_id=' + this.getuserinfo.id + '&shop_id=' + this.getuserinfo.shopData.id;
  this._auth.getCategory(user).subscribe(result => {
      this.categoryList=result
  });
}
  // for form group assign
  async addProductFormValue() {
    this.addProductFormgroup = this.formBuilder.group({
      cat_id: ['', Validators.required],
      barcode: ['', Validators.required],
      qrcode: [''],
      barcode_type: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      sell_by: ['', Validators.required],
      secondry_unit: [''],
      qty: [, Validators.required],
      min_qty: [, Validators.required],
      as_of_date: [, Validators.required],
      sell_price: ['', Validators.required],
      purchase_price: ['', Validators.required],
      hsn_code: [''],
      product_taxe: [, Validators.required],
      shipping_weight: [''],
      country: [''],
      shop_keyword: [''],
      variant: [''],
      var_option: ['']
    })

  }

  urls = [];
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
        }
        this.files_array.push(event.target.files[i]) // collect files name 
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }


  async onSubmit() {

    if (this.addProductFormgroup.invalid) return;
    var user = JSON.parse(localStorage.getItem('user'));
    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('user_shop_id', user.shopData.id);
    formData.append('cat_id', this.addProductFormgroup.value.cat_id);
    formData.append('barcode', this.addProductFormgroup.value.barcode);
    formData.append('barcode_type', this.addProductFormgroup.value.barcode_type);
    formData.append('name', this.addProductFormgroup.value.name);
    formData.append('description', this.addProductFormgroup.value.description);
    formData.append('sell_by', this.addProductFormgroup.value.sell_by);
    formData.append('secondry_unit', this.addProductFormgroup.value.secondry_unit);
    formData.append('qty', this.addProductFormgroup.value.qty);
    formData.append('min_qty', this.addProductFormgroup.value.min_qty);
    formData.append('as_of_date', this.addProductFormgroup.value.as_of_date.toISOString());
    formData.append('sell_price', this.addProductFormgroup.value.sell_price);
    formData.append('purchase_price', this.addProductFormgroup.value.purchase_price);
    formData.append('hsn_code', this.addProductFormgroup.value.hsn_code);
    formData.append('product_taxe', this.addProductFormgroup.value.product_taxe);
    formData.append('shipping_weight', this.addProductFormgroup.value.shipping_weight);
    formData.append('country', this.addProductFormgroup.value.country);
    formData.append('shop_keyword', this.addProductFormgroup.value.shop_keyword);
    formData.append('variant', this.addProductFormgroup.value.variant);
    formData.append('var_option', this.addProductFormgroup.value.var_option);

    for (var i = 0; i < this.files_array.length; i++) {
      formData.append("files", this.files_array[i]);
    }
    console.log(formData, "formData");
    let res = await this._auth.addProduct(formData).toPromise();
    if (this.addProductFormgroup.value) {
      if (res == "success") {
        this._router.navigate(['/dashboard/products']);
      }
    }
  }

  async genrateBarCode() {
    this.barcodenew = '';
    this.addProductFormgroup.get('barcode').setValue('');
    this.barcodenew = await this._auth.genrateBarCode().toPromise();
    if (this.barcodenew.barcode) {
      console.log(this.barcodenew.barcode);
      this.addProductFormgroup.get('barcode').setValue(this.barcodenew.barcode);
    }
  }
  async checkUPCcode(code) { // checkUPCcode?barCode=12345678

    let checkUPC = await this._auth.checkUPCcode(code).toPromise();
    console.log(checkUPC);
    if (checkUPC.status !== 'success') {
      this._notify.showError(checkUPC.message, "Error!")
      this.addProductFormgroup.get('barcode').setValue('');
    }
  }



  formatMoneyBase(value, field) {
    console.log(value)
    console.log(field)
    let format_value = value.length ? formatCurrency(parseFloat(value.replace(/\D/g, '')), 'en', '$').replace('$', '') : '';
    this.addProductFormgroup.get(field).setValue(format_value);
  }
  test_fn(value, field) {
    var value = value.replace(/[^0-9,.]+/g, "");
    //document.getElementById("fid").value = value;
    this.addProductFormgroup.get(field).setValue(value);
  }
  getdate(value) {
    console.log(value.toISOString())
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  addCetegory() {
    var category = $("#cat").val();
    var data = { user_id: this.getuserinfo.id, user_shop_id: this.getuserinfo.shopData.id, name: category };
    this._auth.addCategory(data).subscribe(result => {
      if(result.status=="success"){
        setTimeout(() => {
          this.getCategory();
       $("#c").trigger("click");
        }, 2000);
       
      }
    });
  }
}
