import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from 'app/services/validation.service';

@Component({
  selector: 'control-messages',
  template: '<div *ngIf="errorMessage !== null">{{errorMessage}}</div>',
  styleUrls: ['./controlmessage.component.css']
})
export class ControlmessageComponent implements OnInit {
  //errorMessage: string;
  @Input() control: FormControl;	
  constructor() { }

  ngOnInit() {
  }

    get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }

}
