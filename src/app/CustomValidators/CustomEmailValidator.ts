import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

// this is a useless custom validator as there's already a built-in email validator
export function customEmailValidator(): ValidatorFn {
  // control is the current control that is being validated
  return (control: AbstractControl): ValidationErrors | null => {
    let emailValue: string = control.value;
    let validationError: ValidationErrors = {
      EmailNotValid: { value: emailValue },
    };

    if (emailValue.length == 0) return null; // accept empty email

    return emailValue.includes('@') ? null : validationError;
  };
}