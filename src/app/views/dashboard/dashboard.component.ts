import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  getuserinfo
  getusershopsList
  isMenuOpen = true;
  contentMargin = 25;  
  constructor( public _auth: UserService,
    private _router: Router) { }

    async ngOnInit() {
      if(!localStorage.getItem("user")){
        this._router.navigateByUrl('/');
      }
      this.getuserinfo= JSON.parse(localStorage.getItem('user')); 
      console.log(this.getuserinfo);
      var user='user_id='+this.getuserinfo.id+'&shop_id=0';  
      console.log(user);       
      this.getusershopsList = await this._auth.getUserShops(user).toPromise(); 
           
    }
  
    onMenuToggle() {
      console.log('Testing', this.isMenuOpen);
      this.isMenuOpen= !this.isMenuOpen;
  
      if(!this.isMenuOpen) {
        this.contentMargin = 6;
      } else {
        this.contentMargin = 25;
      }
    }
    onLogout() {
      this._auth.signOut();
      this._router.navigate(['/']);
    }
    active_shop(active_shop) {
      alert(active_shop)    
    }
  }

