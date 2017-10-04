import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router }  from '@angular/router';
import { CommonService } from './services/common.service';
import { AuthService } from './services/auth.service';

declare var localStorage:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'app works!';
  constructor(
    public router: Router, 
    private loginservice : LoginService,
    private commonService : CommonService,
    private authService: AuthService
    ) { }
 
  
  ngOnInit() {
    
  }
}
