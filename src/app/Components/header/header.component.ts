import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isUserLoggedIn : boolean;
  subscription!: Subscription;

  constructor(private userAuthService : UserAuthService) { 
    this.isUserLoggedIn= this.userAuthService.isUserLoggedIn;
  }

  ngOnInit(): void {

    // not effective for monitoring changes, as it only initializes once during the first instance.
    // this.isUserLoggedIn= this.userAuthService.isUserLoggedIn;

    // So this is a Subscriber Component
    this.subscription = this.userAuthService.getUserLoggedInSubject().subscribe(
      status => {
        this.isUserLoggedIn = status;
      }
    );

    // // another way of using EventEmitter instead of BehaviorSubject
    // this.isUserLoggedIn = this.userAuthService.isUserLoggedIn; // Get initial data
    // this.subscription = this.userAuthService.dataChange.subscribe(
    //   status => {
    //     this.isUserLoggedIn = status;
    //   }
    // )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
