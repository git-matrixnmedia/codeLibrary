import { Component, OnInit } from '@angular/core';
import { contentHeaders } from '../headers';
import { constants } from '../constants';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
declare var localStorage: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  siteURL: String;
  public frontURL:any;	
  public customername;
  public isLoggedIn:Boolean = false;
  constructor(
  	public router: Router,
    public http: Http,
  ) {this.siteURL = constants.adminURL;this.frontURL = constants.frontURL; }


  //Log out function
  logout(event) {
    event.preventDefault();
    let body = JSON.stringify({ 'logout': '1' });

    this.http.post(this.siteURL + 'customers/logout', body, { headers: contentHeaders })
      .subscribe(
      response => {
        let msg = response; console.log(msg);
        if (msg.json().isLogOut > 0) {
          localStorage.removeItem('customer_info');
          window.location.href = this.frontURL+"#/login";
        }
      },
      error => {
        console.log(error);
      }
      );
  }

  //Get the name of logged in user
  logindetails() {
    let customerInfo = JSON.parse(localStorage.getItem('customer_info'));  

    if(localStorage.getItem('customer_info'))
    {
      this.isLoggedIn = true;
      this.customername = customerInfo.fullname;
    }
    else
    {
      this.customername = '';
    }
 }

  ngOnInit() {
  	this.logindetails();
  }

}
