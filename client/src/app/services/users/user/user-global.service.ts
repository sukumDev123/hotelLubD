import {
  Injectable
} from '@angular/core';
import {
  JwtHelperService
} from '@auth0/angular-jwt';
import {
  Router
} from '@angular/router';
import {
  UserInfo,
  UserForBooking
} from '../../../interface/userinterface';





@Injectable({
  providedIn: 'root'
})
export class UserGlobalService {

  constructor(private jwtHelper: JwtHelperService, private _router: Router) {}

  Logout() {
    if (this.isLogin()) {
      localStorage.removeItem("Login")
      this._router.navigate(['/core/auth/signin'])
    }
  }

  isLogin() {
    return !!localStorage.getItem('Login')
  }
  setSession(token) {
    localStorage.setItem('Login', token)
  }

  getSession() {
    return localStorage.getItem("Login")
  }

  
  UserData(): UserInfo {
    if (this.isLogin()) {
      try {
        return this.jwtHelper.decodeToken(this.getSession())
      } catch (error) {
        alert("Token is not ture")
        this.Logout()
      }
    }
    return {
      username: '',
      displayname: '',
      firstname: '',
      lastname: '',
      roles: ['null'],
      _id: '',
      phone: '',
      email: ''
    }

  }

  checkTokenExp() {
    if (this.jwtHelper.isTokenExpired(this.getSession())) {
      localStorage.removeItem('login')
      this._router.navigate(['/core/home'])
    }
    console.log(`Your Token is ${this.getSession() ? this.getSession() : "Not Have Token."}`)
  }
}
