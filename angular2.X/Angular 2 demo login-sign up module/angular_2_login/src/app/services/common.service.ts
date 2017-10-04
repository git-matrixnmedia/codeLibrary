import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response,URLSearchParams } from '@angular/http';
import { contentHeaders } from '../headers';
import { constants } from '../constants';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
declare var localStorage:any;

@Injectable()
export class CommonService {
  /*  Name : CommonService
   *  Created on : 17/05/2017 (dd/mm/yyyy)
   * ---------------------------------------------------------------------------                
   *  HOW TO USE THIS SERVICE? :: Using this service is very simple and dynamic.
   *                     step 1 : In component's constructor take a class name and declare it with this service 
   *                       exp  : 'private commonService: CommonService'
   *                     step 2 : To check a whether an user is logged in or not  we can use the below method
   *                                 this.commonService.isLoggedIn(); 
   *  
   */	

  constructor(public router: Router, private http: Http) { }

    

    

   //Chaeck a user is logged in or not  
   isLoggedIn() 
   {
      let redirect: boolean = false;
      let frontURL = constants.frontURL;
      console.log('within isloggedin function!!!');
      if(localStorage.getItem('customer_info'))
       {
        redirect =  true;
       }
       else
       {
        redirect =  false;
       }
       console.log(redirect);

       if (redirect === false) 
       {        
          console.log("User not logged in, redirecting!!!");
          this.router.navigate(['/login']);
          return;
       }
       else
       {
        console.log(this.router.url);
          if(this.router.url.includes('login') == true)
          {
            this.router.navigate(['/home']);
          }
          else
          {
            //this.router.navigate(this.router.url);
          }
       }
    }

}

// this could also be a private method of the component class
    function handleError (error: any) {
      // log error
      // could be something more sofisticated
      let errorMsg = error.message || `Woops! There is problem in fetching data!`;
      console.log(errorMsg);

      // throw an application level error
      return Observable.throw(errorMsg);
    }
