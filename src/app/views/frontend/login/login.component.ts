import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core';
import { UserService } from 'src/app/core/_services/user.service';

declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: any = '';
  username: any = '';
  constructor(private router: Router,
              public _auth: UserService,
              private _notify:NotificationService
              ) { 
                
              }

  ngOnInit(): void {

  }
  checkMobile = false;
  mobile = "";
  step1() {
    this.checkMobile = false;
    //debugger
    this.mobile = $("#mobile").val();
    if (this.mobile == "" || this.mobile.trim() == "") {
      this.checkMobile = true;
      return
    }
    var data = { mobile: this.mobile }
    this._auth.login(data).subscribe(res => {
      //debugger
      if (res.status == "success") {
      $("#step1").css("display", "none");
      $("#otp").css("display", "block");
      }else{
        alert(res.message)
      }
    }, error => {

    });

  }
  user: any = {};
  otp() {
    //debugger
    var otp = "";
    otp += $("#digit-1").val();
    otp += $("#digit-2").val();
    otp += $("#digit-3").val();
    otp += $("#digit-4").val();
    otp += $("#digit-5").val();
    otp += $("#digit-6").val();
    var data = { mobile: this.mobile, otp: otp }
    this._auth.verifyOTPSignup(data).subscribe(res => {
      //debugger
      if (res.status == "success") {
        this.user = res.data;
        localStorage.setItem("user",JSON.stringify(this.user));        
        this._notify.showSuccess("Login successfully", "Success")
        this.router.navigateByUrl("dashboard");
      } else {
        this.user = {}
      }
    }, error => {

    })
  }

  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  ngAfterViewInit() {
    $('.digit-group').find('input').each(function () {
      $(this).attr('maxlength', 1);
      $(this).on('keyup', function (e) {
        var parent = $($(this).parent());

        if (e.keyCode === 8 || e.keyCode === 37) {
          var prev = parent.find('input#' + $(this).data('previous'));

          if (prev.length) {
            $(prev).select();
          }
        } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
          var next = parent.find('input#' + $(this).data('next'));

          if (next.length) {
            $(next).select();
          } else {
            if (parent.data('autosubmit')) {
              parent.submit();
            }
          }
        }
      });
    });
  }
}
