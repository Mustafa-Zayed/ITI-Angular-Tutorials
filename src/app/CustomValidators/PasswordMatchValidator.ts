import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
// Cross-field custom validator
//https://angular.io/guide/form-validation#cross-field-validation


// If validator has no parameters
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  // control is the current form group that is being validated, as this validator is
  // used on a form group not a form control
    let passwordControl = control.get('password');
    let confirmPasswordControl = control.get('confirmPassword');

    if (
      !passwordControl ||
      !confirmPasswordControl ||
      (!passwordControl.value && !confirmPasswordControl.value)
    )
      return null;

    let validationError: ValidationErrors = {
      PasswordNotMatch: {
        password: passwordControl.value,
        confirmPassword: confirmPasswordControl.value,
      },
    };

    return passwordControl.value == confirmPasswordControl.value
      ? null
      : validationError;
  };
// };

// If validator has parameters
export function passwordMatchValidatorAdvanced(complexPassword: boolean): ValidatorFn {
  // control is the current form group that is being validated, as this validator is
  // used on a form group not a form control
  return (control: AbstractControl): ValidationErrors | null => {
    let passwordControl = control.get('password');
    let confirmPasswordControl = control.get('confirmPassword');

    if (
      !passwordControl ||
      !confirmPasswordControl ||
      (!passwordControl.value && !confirmPasswordControl.value)
    )
      return null;

    let validationErrorAdvanced: ValidationErrors = {
      AdvValidationError: {
        // WeakPassword: {
        //   password: passwordControl.value,
        //   reason: 'fullName or email is in the password',
        // },
        // PasswordNotMatch: {
        //   password: passwordControl.value,
        //   confirmPassword: confirmPasswordControl.value,
        // },
      }
    };

    //If complextPassword?, check fullname or email is not included in password
    if (complexPassword) {
      if (
        (passwordControl.value.includes(control.get('fullName')?.value) ||
        passwordControl.value.includes(control.get('email')?.value)) 
        &&
        (control.get('fullName')?.value != '' && control.get('email')?.value != '')
      ) {
        // console.log('in passwordMatchValidatorAdvanced');

        validationErrorAdvanced = {
          AdvValidationError: {
            WeakPassword: {
              password: passwordControl.value,
              reason: 'fullName or email is in the password',
            }
          }
        }
        return validationErrorAdvanced;
      }
    }

    // normal validator, not complex, check password match only without checking WeakPassword

    validationErrorAdvanced = {
      AdvValidationError: {
        // // spread the WeakPassword object, but not needed as we return the WeakPassword object in 
        // // the previous condition
        // ...validationErrorAdvanced['AdvValidationError'], 
        PasswordNotMatch: {
          password: passwordControl.value,
          confirmPassword: confirmPasswordControl.value,
        },
      }
    }

    return passwordControl.value == confirmPasswordControl.value
      ? null
      : validationErrorAdvanced;
  };
};
  