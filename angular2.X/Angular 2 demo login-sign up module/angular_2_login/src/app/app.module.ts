import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// ----------- import routes
import { routes } from './app.router';
import {Location, LocationStrategy, HashLocationStrategy } from '@angular/common'; // hash url provider
//import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common'; // no-hash url provider
import {APP_BASE_HREF} from '@angular/common';
// ----------- //  import routes

import { Angular2SocialLoginModule } from "angular2-social-login";
import { LoginService } from './services/login.service';
import { CommonService } from './services/common.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ValidationService } from './services/validation.service';
// ------------ pipes -------


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ControlmessageComponent } from './controlmessage/controlmessage.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    ControlmessageComponent,
    ResetPasswordComponent,
    HomeComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    ReactiveFormsModule,
    Angular2SocialLoginModule,
  ],
  providers: [
    ValidationService,
    AuthGuardService,
    AuthService,
    LoginService,
    CommonService,
    Location, 
   { provide: LocationStrategy, useClass: HashLocationStrategy},// hash url provider
    //{provide: LocationStrategy, useClass: PathLocationStrategy},
    //{provide: APP_BASE_HREF, useValue: '/imageapp'}
  ],
  
  bootstrap: [AppComponent]
})

export class AppModule {
  location: Location;
  constructor(location: Location) { this.location = location; }
 }
enableProdMode();
let socialproviders = {
    "google": {
      "clientId": "475188127709-5ls6f8bl92qs3jpc70mcivgfbfakphog.apps.googleusercontent.com" 
    },
    "facebook": {
      "clientId": "1413236202070353",
      "apiVersion": "v2.9" //like v2.4 
    }
  };
Angular2SocialLoginModule.loadProvidersScripts(socialproviders);
