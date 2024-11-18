import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { customEmailValidator } from 'src/app/CustomValidators/CustomEmailValidator';
import { existEmailValidator } from 'src/app/CustomValidators/ExistEmailValidator';
import { passwordMatchValidator, passwordMatchValidatorAdvanced } from 'src/app/CustomValidators/PasswordMatchValidator';
import { IUser } from 'src/app/Models/iuser';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  existedUserEmails: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    // It's supposed to call an API to get the exist emails
    this.existedUserEmails = [
      'aa@aa.com',
      'bb@bb.com',
      'cc@cc.com',
      'dd@dd.com',
      'ee@ee.com',
      'ff@ff.com',
    ];

    this.userRegisterForm = formBuilder.group({
      fullName: [
        '',
        [Validators.required, Validators.pattern('[A-Za-z ]{3,}')],
      ],
      // email: ['', [Validators.required, Validators.email]], //formBuilder.control('', Validators.email)
      // email: ['', [Validators.required, customEmailValidator()]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          existEmailValidator(this.existedUserEmails),
        ],
      ],
      phoneNo: formBuilder.array([
        formBuilder.control('', Validators.required),
      ]), //['', Validators.required]
      address: formBuilder.group({
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        street: ['', Validators.required],
      }),
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      referral: [''],
      referralOther: [''],
      //referralOther:['', Validators.required] => not correct as it will be required even if the 'other' button isn't selected, but we should make it dynamic based on if the 'other' button selected or not
    }, 
    {
      // validators: [passwordMatchValidator]
      validators: [passwordMatchValidatorAdvanced(true)]
    });

    // this.userRegisterForm = new FormGroup({
    //   fullName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z ]{3,}')]),
    //   email: new FormControl('', Validators.email),
    //   phoneNo: new FormControl('', Validators.minLength(11)),
    //   address: new FormGroup({
    //     city: new FormControl(''),
    //     postalCode: new FormControl(''),
    //     street: new FormControl(''),
    //   }),
    //   password: new FormControl('', Validators.minLength(6)),
    //   confirmPassword: new FormControl('', Validators.minLength(6)),
    // });
  }

  ngOnInit(): void {
    // this.fillForm();
  }

  // In case we want to fill or edit the form.
  fillForm() {
    // it's supposed to call an API to get the data of the user
    // to edit and fill the form instead of manually filling it.

    // setValue(): must provide all properties
    // patchValue(): can set partial properties

    // //set a single value
    // this.userRegisterForm.get('fullName')?.setValue('John Doe');

    this.userRegisterForm.setValue({
      fullName: 'John Doe',
      email: '3oYQG@example.com',
      phoneNo: '0123456789',
      address: {
        city: 'Cairo',
        postalCode: '12345',
        street: 'Main Street',
      },
      password: '123456',
      confirmPassword: '123456',
    });

    // this.userRegisterForm.patchValue({
    //   fullName: 'John Doe',
    //   email: '3oYQG@example.com',
    //   phoneNo: '0123456789',

    //   password: '123456',
    //   confirmPassword: '123456',
    // })
  }

  // pushing new phone numbers dynamically in the runtime is based on the dynamic form property in the reactive form
  addPhoneNo() {
    // when looping over formArray in the html, we use formArray.controls property. But when
    // pushing to the formArray, we use formArray.push() method not formArray.controls.push()

    this.phoneNoArray.push(this.formBuilder.control('', Validators.required));
  }
  
  removePhoneNo(index: number) {
    this.phoneNoArray.removeAt(index);
  }

  register() {
    // alert(JSON.stringify(this.userRegisterForm.value));
    let userModel: IUser = this.userRegisterForm.value as IUser;
    // supposed to call the backend API to register the user
    console.log(userModel);
  }

  // adding validators dynamically in the runtime based on the conditional/dynamic validation property in the reactive form
  updateReferralValidators() {
    if (this.referral?.value == 'other')
      this.referralOther?.addValidators([Validators.required]);
    else this.referralOther?.clearValidators();

    this.referralOther?.updateValueAndValidity();
  }

  get fullName() {
    return this.userRegisterForm.get('fullName');
  }

  get email() {
    return this.userRegisterForm.get('email');
  }

  get phoneNoArray() {
    return this.userRegisterForm.get('phoneNo') as FormArray;
  }

  get address() {
    return this.userRegisterForm.get('address');
  }

  get password() {
    return this.userRegisterForm.get('password');
  }

  get confirmPassword() {
    return this.userRegisterForm.get('confirmPassword');
  }

  get referral() {
    return this.userRegisterForm.get('referral');
  }

  get referralOther() {
    return this.userRegisterForm.get('referralOther');
  }
}
