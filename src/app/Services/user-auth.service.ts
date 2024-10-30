import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {

  private isUserLoggedSubject: BehaviorSubject<boolean>;
  // private isUserLoggedSubject: Subject<boolean>;
  
  // isUserLoggedIn: boolean = false; // if we set isUserLoggedIn property here instead of in login() or logout() in UserLogin component.
  
  // dataChange: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    this.isUserLoggedSubject = new BehaviorSubject<boolean>(this.isUserLoggedIn);
    // this.isUserLoggedSubject = new Subject<boolean>();
  }

  login(userName: string, password: string) {
    
    // Call login API, and get Access Token
    let userToken = '123456789'; // static, must come from API
    localStorage.setItem('token', userToken);

    // if we set this here instead of in login() in UserLogin component we should navigate 
    // to UserLogin component to listen to the new isUserLoggedIn property.
    // this.isUserLoggedIn = true;

    this.isUserLoggedSubject.next(true);

    // this.dataChange.emit(true); // Notify all listeners
  }

  logout() {
    localStorage.removeItem('token');

    // if we set this here instead of in logout() in UserLogin component we should navigate 
    // to UserLogin component to listen to the new isUserLoggedIn property.
    // this.isUserLoggedIn = false; 

    this.isUserLoggedSubject.next(false);
    
    // this.dataChange.emit(false);
  }

  get isUserLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  getUserLoggedInSubject(): Observable<boolean> {
    return this.isUserLoggedSubject.asObservable();
  }
}
