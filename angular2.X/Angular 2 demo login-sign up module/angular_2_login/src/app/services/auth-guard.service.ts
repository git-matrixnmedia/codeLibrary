import { Injectable } from '@angular/core';
import {  CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { constants } from '../constants';

 @Injectable()
export class AuthGuardService implements CanActivate{
  /*  Name : AuthGuardService
   *  Created on : 22/05/2017 (dd/mm/yyyy)
   * Explaination : This service is used for user authentication by the use of CanActive
   *  
   */	
  public frontURL:any;
  constructor(private authService: AuthService, private router: Router) {this.frontURL = constants.frontURL; }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
  {
    let url: string = state.url;

    return this.checkLogin(url);
  }


  checkLogin(url: string): boolean 
  {
    console.log("Checking User login");
    this.authService.checkloggedIn();
    console.log('this.authService.isLoggedIn ', this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) { return true; }


    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url; 
    console.log('not logged in')
    this.router.navigate(['/login']);
    return true;
  }

}
