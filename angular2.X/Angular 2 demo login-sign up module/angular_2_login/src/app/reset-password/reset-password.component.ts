import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { AuthService } from "angular2-social-login";
import { contentHeaders } from '../headers';
import { CommonService } from '../services/common.service';
import { LoginService } from '../services/login.service';
import { constants } from '../constants'
declare var $:any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent{	 
  siteURL : String ;
  frontURL : String ;
  error   : String ;
  success : String ;
  resetpasswordForm: any;
  public user;
  sub: any;
  constructor(
  	public _auth: AuthService,
  	public router: Router,
  	private loginservice: LoginService,
    public http: Http, 
    private commonService: CommonService, 
    private formBuilder: FormBuilder) { 

      this.siteURL = constants.adminURL;
      this.frontURL = constants.frontURL;
      this.resetpasswordForm = this.formBuilder.group({
        'password': ['', [Validators.required]],
        'confirm_password': ['', [Validators.required]]
      });
  }

  // Forgot Password
    resetpassword(event, password, confirm_password)
    {
      event.preventDefault();

      		let url = window.location.href;
      		let newURL = url.split('?');
      		let newToken = newURL[1].split('=');
      		let token = newToken[1];

      let body = JSON.stringify({"password":password,"confirm_password":confirm_password,"token":token});
      if(password !== confirm_password)
      {
            this.error = 'Password and Confirm Password is not matching';
            $('#resetPasswordForm .login-error-mgs').addClass('active');
            $('#resetPasswordForm .login-success-mgs').removeClass('active');
            return;
      }
      this.http.post(this.siteURL+'customers/resetpassword', body, { headers: contentHeaders })
        .subscribe(
          response => {
            let msg = response;
            console.log(msg);
            if(msg.json().isReset>0)
            {
              this.success = msg.json().message;
              this.error = '';
              $('#resetPasswordForm .login-error-mgs').removeClass('active');
              $('#resetPasswordForm .login-success-mgs').addClass('active');
              this.resetpasswordForm.reset();
            }
            else
            {
              this.error = msg.json().message;
              this.success = '';
              $('#resetPasswordForm .login-error-mgs').addClass('active');
              $('#resetPasswordForm .login-success-mgs').removeClass('active');
            }
          },
          error => {
            console.log(error);
          }
        );
    }


  // Social Sign Up
  socialSignIn(provider) {
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        this.user = data;
        this.loginservice.updateLoginData(data,this.siteURL,this.frontURL);
      }
    )
  }

  headerFixed() {
    $(document).scroll(function () {
      var $nav = $(".navbar-fixed-top");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
  }

  ngOnInit() {
  	this.headerFixed();
  }

}
