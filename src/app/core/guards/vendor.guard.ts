import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/AuthService";

@Injectable({
  providedIn: 'root'
})
export class VendorGuard implements CanActivate {
   constructor(private router: Router, private authService: AuthService) {}

   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      {
         if (this.authService.isLoggedIn()) {
            return true;
         } else {
            this.router.navigate(['auth/login'], {
               queryParams: { returnUrl: state.url },
            });
            return false;
         }
      }
   }

}
