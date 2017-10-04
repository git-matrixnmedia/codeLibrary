import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
declare var localStorage:any;

@Injectable()
export class AuthService {
  /*  Name : AuthService
   *  Created on : 22/05/2017 (dd/mm/yyyy)
   
   * ---------------------------------------------------------------------------                
   *  
   * Explaination : This service is used for user authentication by the use checkloggedIn function 
   *  
   */

  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor() { 
  	console.log(JSON.parse(localStorage.getItem('customer_info')));
   }


   checkloggedIn()
   {
   		if(localStorage.getItem('customer_info'))
		{
			this.isLoggedIn =  true;
		}
		else
		{
			this.isLoggedIn =  false;
		}
		return this.isLoggedIn;
   }
}
