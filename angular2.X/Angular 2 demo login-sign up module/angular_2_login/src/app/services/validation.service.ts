import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class ValidationService {

  constructor() { }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'This field is required',
            'invalidEmailAddress': 'Invalid email address',
            'areEqual:':'Email ID and Confirm Email ID does not match',

            'invalidPhoneNumber' : 'Invalid Phone Number',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',

            'invalidCard':'Please enter a valid card number'
        };

        return config[validatorName];
    }

  static emailValidator(control) {
      if(control.value != null)
      {
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
      }
    }


  static phoneValidator(control) {
      if(control.value != null)
      {
        if (control.value.match(/[0-9+-]/)) {
            return null;
        } else {
            return { 'invalidPhoneNumber': true };
        }
      }
    }  

  /*static areEqual(group: ControlGroup) {
      var valid = false;

      for (name in group.controls) {
        var val = group.controls[name].value;

        let value = group.controls['email'].value;
        let confirmValue = group.controls['confirm_email_id'].value;
         if (value === confirmValue) {
          valid = true;
        }
        
      }

      if (valid) {
        return null;
      }

      return {
        areEqual: true
      };
 }*/


static creditCardValidator(control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        } else {
            return { 'invalidCard': true };
        }
}

 static matchingEmail(email_id: string, confirm_email_id: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let email = group.controls[email_id];
    let confirm_email = group.controls[confirm_email_id];

    if (email !== confirm_email) {
      return {
        areEqual: true
      };
    }
  }
}


}
