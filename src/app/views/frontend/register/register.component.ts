import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/_services/user.service';

declare var $;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register_user: FormGroup;
  submitted = false;

  checkboxValue: boolean = false;
  confirmPassword: any = '';
  closeResult: string;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private api: UserService
  ) { }

  ngOnInit(): void {
    this.register_user = this.formBuilder.group({
      store_name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      country: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      mobile: [''],
    });
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
    this.api.register(data).subscribe(res => {
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
    this.api.verifyOTPSignup(data).subscribe(res => {
      //debugger
      if (res.status == "success") {
        this.user = res.data;
        $("#step1").css("display", "none");
        $("#otp").css("display", "none");
        $("#step2").css("display", "block");
      } else {
        this.user = {}
      }
    }, error => {

    })
  }

  // nullValidator
  // convenience getter for easy access to form fields
  get f() { return this.register_user.controls; }

  /***
   * function to register the user
   */
  registerUser() {
    //debugger
    this.submitted = true;
    if (this.register_user.invalid) {
      return;
    }
    var formData = new FormData();

    formData.append("store_name", this.register_user.value.store_name);
    formData.append("email", this.register_user.value.email);
    formData.append("country", this.register_user.value.country);
    formData.append("address", this.register_user.value.address);
    formData.append("city", this.register_user.value.city);
    formData.append("state", this.register_user.value.state);
    formData.append("mobile", this.mobile);
    formData.append("user_id", this.user.id);
    this.api.userShop(formData).subscribe(res => {
      if(res.status=="success"){
        alert(res.message);
        this.router.navigateByUrl("login");
      }
//debugger
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
