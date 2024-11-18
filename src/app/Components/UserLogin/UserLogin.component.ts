import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-UserLogin',
  templateUrl: './UserLogin.component.html',
  styleUrls: ['./UserLogin.component.scss']
})
export class UserLoginComponent implements OnInit {

  isUserLoggedIn : boolean = false;
  returnUrl: string = '/';

  constructor(private activatedRoute: ActivatedRoute,private userAuthService : UserAuthService
    ,private router : Router
  ) { }

  ngOnInit() {
    this.isUserLoggedIn= this.userAuthService.isUserLoggedIn;

    // Get the return URL from the query parameters or default to '/'
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    // So this is a Publisher Component
    this.userAuthService.login('userName', 'password'); // static for testing

    // navigation to Login or Logout will reload this component's ngOnInit, so we can set the 
    // isUserLoggedIn property in the login() and logout() in user-auth.service instead of here.
    this.isUserLoggedIn= this.userAuthService.isUserLoggedIn;

    // this.router.navigate(['Login']); 

    // Redirect to the intended URL or '/' if the intended URL is not available
    this.router.navigate([this.returnUrl]); 
  }

  logout() {
    // So this is a Publisher Component
    this.userAuthService.logout();
    this.isUserLoggedIn= this.userAuthService.isUserLoggedIn;

    this.router.navigate(['Logout']);
  }

}
