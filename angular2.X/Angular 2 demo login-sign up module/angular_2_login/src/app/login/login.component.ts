import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

import { contentHeaders } from '../headers';
import { CommonService } from '../services/common.service';
import { constants } from '../constants';
declare var $:any;
declare var document:any;
declare var localStorage:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  showSignUp: boolean = false;
  forgotPassword: boolean = false;
  showLogin: boolean = true;
  siteURL : String ;
  frontURL : String ; 
  error   : String ;
  success : String ;
  areEqual: boolean; 
  signupForm: any;
  loginForm: any;
  forgotpasswordForm: any;
  public user;
  sub: any;
  constructor(
    public _auth: AuthService,
    public router: Router,
    private loginservice: LoginService,
    public http: Http, 
    private commonService: CommonService, 
    private formBuilder: FormBuilder
  ) { 
      
      this.siteURL = constants.adminURL;
      this.frontURL = constants.frontURL;
      this.commonService.isLoggedIn();
      this.loginForm = this.formBuilder.group({
        'email_id': ['', [Validators.required, ValidationService.emailValidator]],
        'password': ['', [Validators.required]]
      });


      this.signupForm = this.formBuilder.group({
      'name': ['', [Validators.required]],  
      'email_id': ['', [Validators.required, ValidationService.emailValidator]],
      'confirm_email_id': ['', [Validators.required, ValidationService.emailValidator]],
      'password': ['', [Validators.required]]   
    });


      this.forgotpasswordForm = this.formBuilder.group({
        'email_id': ['', [Validators.required, ValidationService.emailValidator]],
      });
  }


  //Hide Loader
  loaderhide() {
     $(".http-loader").hide();
  }


  //Show Loader
  loadershow() {
     $(".http-loader").show();
  }


  // For showing multiple tab for login, Sign Up, Forgot Password
  showTab(tab){
        this.showSignUp = false;
        this.forgotPassword = false;
        this.showLogin = false;
        if(tab == 'showSignUp') {
            this.showSignUp = true;
        }
        if(tab == 'forgotPassword') {
            this.forgotPassword = true;
        }
        if(tab == 'showLogin') {
            this.showLogin = true;
        }
    }

  // General Sign In function
   login(event, email_id, password) {
      event.preventDefault();
      $('.login-loader-container').addClass('active');
      
      let body = JSON.stringify({ email_id, password });
      this.http.post(this.siteURL+'customers/loginCustomer', body, { headers: contentHeaders })
        .subscribe(
          response => {
            let message = response;
            if(message.json().isloggedin>0)
            {
              localStorage.setItem('customer_info', JSON.stringify(message.json().customerInfo['0'].Customer));
              window.location.href = this.frontURL+"#/home";
              $('.login-loader-container').removeClass('active');
            }
            else
            {
              this.error = message.json().customerInfo;
              $('#logInForm .login-error-mgs').addClass('active');
              $('.login-loader-container').removeClass('active');
            }
            
          },
          error => {
            console.log(error);
          },
        );
    }

    // General Sign Up function
   signup(event, name, email_id, confirm_email_id, password) {
      event.preventDefault();
      $('.login-loader-container').addClass('active');
      let body = JSON.stringify({ name, email_id, confirm_email_id, password });
      if(email_id !== confirm_email_id)
      {
            this.error = 'Email ID and Confirm Email ID is not matching';
            $('#signUpForm .login-error-mgs').addClass('active');
            $('#signUpForm .login-success-mgs').removeClass('active');
            $('.login-loader-container').removeClass('active');
            return;
      }
      this.http.post(this.siteURL+'/customers/signupCustomer', body, { headers: contentHeaders })
        .subscribe(
          response => {
            let msg = response; console.log(msg);
            if(msg.json().isSignUp>0)
            {
              this.success = msg.json().message;
              this.error = '';
              $('#signUpForm .login-error-mgs').removeClass('active');
              $('#signUpForm .login-success-mgs').addClass('active');
              this.signupForm.reset();
              $('.login-loader-container').removeClass('active');
            }
            else
            {
              this.error = msg.json().message;
              this.success = '';
              $('#signUpForm .login-error-mgs').addClass('active');
              $('#signUpForm .login-success-mgs').removeClass('active');
              $('.login-loader-container').removeClass('active');
            }
            
          },
          error => {
            console.log(error);
          }
        );   
    } 


    // Forgot Password
    forgotpassword(event, email_id)
    {
      event.preventDefault();

      let body = JSON.stringify({ email_id });
      this.http.post(this.siteURL+'customers/forgetpassword', body, { headers: contentHeaders })
        .subscribe(
          response => {
            let msg = response;
            console.log(msg);
            if(msg.json().isForgot>0)
            {
              this.success = msg.json().message;
              this.error = '';
              $('#forgotPasswordForm .login-error-mgs').removeClass('active');
              $('#forgotPasswordForm .login-success-mgs').addClass('active');
              this.forgotpasswordForm.reset();
            }
            else
            {
              this.error = msg.json().message;
              this.success = '';
              $('#forgotPasswordForm .login-error-mgs').addClass('active');
              $('#forgotPasswordForm .login-success-mgs').removeClass('active');
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


  ngOnDestroy() {
    //this.sub.unsubscribe();
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


