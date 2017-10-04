import { Injectable } from '@angular/core';
import { contentHeaders } from '../headers';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
declare var localStorage:any;
declare var $:any;

@Injectable()
export class LoginService {

  error   : String ;
  constructor(public router: Router, public http: Http) { }

  private logindata = {
    "login": "false",
    "email": "",
    "userimage": "",
    "username": ""
  }

  

  publicLoginOption() {
    return this.logindata;
  }
  updateLoginData(userdata,siteURL,frontURL) {
    // login or code for updating login details
    this.logindata.login = 'true';
    this.logindata.email = userdata.email;
    this.logindata.username = userdata.name;
    this.logindata.userimage = userdata.image;

    let body = JSON.stringify({ 'email_id':userdata.email,'name':userdata.name,'image':userdata.image,'password':userdata.password,'provider':userdata.provider,'uid':userdata.uid });
    $('.login-loader-container').addClass('active');
    this.http.post(siteURL+'customers/socialSignUp', body, { headers: contentHeaders })
      .subscribe(
        response => {
          let message = response;
          if(message.json().isloggedin>0)
            {
              localStorage.setItem('customer_info', JSON.stringify(message.json().customerInfo['0'].Customer));
              window.location.href = frontURL+"#/home";
              $('.login-loader-container').removeClass('active');
            }
            else
            {
              this.error = message.json().customerInfo;
              $('.login-loader-container').removeClass('active');
            }
            
        },
        error => {
          alert(error.text());
          console.log(error);
        }
      );
  }

}
