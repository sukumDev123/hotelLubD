import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/users/auth/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _user: UserServiceService, private _router: Router) {

  }

  canActivate(): boolean {
    if (this._user.isLogin()) {
      if (this._user.getSession().roles === 'admin') {
        return true

      } else {

        return false
      }
    }
    else {
      this._router.navigate(['/core/signin'])
      return false
    }

  }




}
