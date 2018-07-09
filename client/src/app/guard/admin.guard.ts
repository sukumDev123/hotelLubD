import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { UserGlobalService } from '../services/users/user/user-global.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _user: UserGlobalService, private _router: Router) {

  }

  canActivate(): boolean {
    if (this._user.isLogin()) {
      if (this._user.UserData().roles[0] === 'admin') {
        return true

      } else {

        return false
      }
    }
    else {
      this._router.navigate(['/core/auth/signin'])
      return false
    }

  }




}
