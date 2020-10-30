import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import{HttpClientService} from'src/app/core/_interceptors';
import{Observable,BehaviorSubject} from'rxjs';
import{map} from'rxjs/operators';
import{Router} from'@angular/router';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  configData: any = {
    devServerPath: '',
  }
  customerData;
  constructor(
    private http: HttpClient ,
    private _http: HttpClientService,
    private _router: Router,    
    private _notify:NotificationService
    
    ) {
    this.configData.devServerPath = 'http://75.101.138.121:3000/v1/';
   }

  register(data): Observable<any> {
    return this.http.post(this.configData.devServerPath+'user',data);
  }

  verifyOTPSignup(data): Observable<any> {
    return this.http.post(this.configData.devServerPath+'verifyOTPSignup',data);
  }

  userShop(data): Observable<any> {
    return this.http.post(this.configData.devServerPath+'user-shop',data);
  }

  login(data): Observable<any> {
    return this.http.post(this.configData.devServerPath+'loginWithOTP',data);
  } 
  
  // Api for get category 
  getCategory(user):Observable<any> {
    return this._http.get('category?'+user).pipe(map(res=>{
			return res.status == 'success' ? res.data : [];
		}));
  }
  // Api for get Units 
  getUnits():Observable<any> {
    return this._http.get('unit').pipe(map(res=>{
			return res.status == 'success' ? res.data : [];
		}));
  }
  // Api for get genrate BarCode 
  genrateBarCode():Observable<any> {
    return this._http.get('genrateBarCode?cache=false').pipe(map(res=>{
			return res.status == 'success' ? res.data : [];
		}));
  }
  // Api for get Product Lists 
  getProducts(data):Observable<any> {
    return this._http.get('product?'+data).pipe(map(res=>{
			return res.status == 'success' ? res.data.user_products : [];
		}));
  }
  // Api for get User Shop 
  getUserShops(data):Observable<any> {
    return this._http.get('user-shop?'+data).pipe(map(res=>{
			return res.status == 'success' ? res.data : [];
		}));
  }
  // Api for check UPCcode uniq 
  checkUPCcode(code):Observable<any> {
    return this._http.get('checkUPCcode?barCode='+code);
  }
  signOut() {		
		localStorage.removeItem("user");			
		this._router.navigate(['/']);		
  }
  addProduct(data):Observable<any>{
    return this._http.post('product', data).pipe(map(res=>{
      if(res.status=="success"){
        this._notify.showSuccess(res['message'], "Success")
      }else{
        this._notify.showError(res['message'], "Error")
      }
      return res.status || null;
    }));
  }

  addCategory(data):Observable<any>{
    return this.http.post(this.configData.devServerPath+'category',data);
  }

    // Api for get invoice Lists 
    getInvoice(data):Observable<any> {
      return this._http.get('getInvoiceHistory?'+data).pipe(map(res=>{
        return res.status == 'success' ? res.data : [];
      }));
    }

    //API to add customer
    addCustomers(data):Observable<any>{
      return this.http.post(this.configData.devServerPath+'customer', data);
    }

    //Api to get customer list
    getCustomers(data):Observable<any> {
      return this.http.get(this.configData.devServerPath+'customer?'+data);
}
  //Api to update customer
    updateCustomers(data):Observable<any>{
       return this.http.post(this.configData.devServerPath+'update-customer',data);
    }

  //Api to delete customer 
 /* deleteCustomers(data):Observable<any>{
    return this.http.delete(this.configData.devServerPath+'delete-customer?'+data);
  }*/
    
}
