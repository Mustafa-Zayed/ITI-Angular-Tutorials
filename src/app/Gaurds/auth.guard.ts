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
      
      // Store the attempted URL for redirecting after login
      this.router.navigate(['/Login'], { 
        queryParams: { returnUrl: state.url } 
      });
      // console.log(state.url);
      // console.log(route.url);
      // console.log(this.router.url);

      return false;
    }
  }
}
