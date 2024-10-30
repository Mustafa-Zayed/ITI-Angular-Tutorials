import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../Services/user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {


  constructor(private userAuthService: UserAuthService,
    private router: Router) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):| Observable<boolean | UrlTree>| Promise<boolean | UrlTree>| boolean| UrlTree {

    if (this.userAuthService.isUserLoggedIn) 
      return true;
    else{
      alert("Please login first");
      this.router.navigate(['Login']);
      return false;
    }
  }
}
