import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../../../interface/userinterface'
import { JwtHelperService } from '@auth0/angular-jwt'
import host from '../../../host.global'
import { Router } from '@angular/router';

interface UserInfo {
  username: string,
  displayname: string,
  firstname: string,
  lastname: string,
  roles: Array<string>,
  _id: string
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private _host = host
  constructor(private _http: HttpClient, private jwtHelper: JwtHelperService, private _router: Router) { }

  lognInService(data): Observable<any> {
    return this._http.post<any>(`${this._host}/api/user/auth/signin`, data)
  }
  signUpService(data): Observable<User> {
    return this._http.post<User>(`${this._host}/api/user/auth/signup/user`, data)
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
  Logout() {
    if (this.isLogin()) {
      localStorage.removeItem("Login")
      this._router.navigate(['/core/auth/signin'])
    }
  }

  UserData(): UserInfo {
    try {
      return this.jwtHelper.decodeToken(this.getSession())
    } catch (error) {
      alert("Token is not ture")
      this.Logout()
    }
    return {
      username: '',
      displayname: '',
      firstname: '',
      lastname: '',
      roles: ['null'],
      _id: ''
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
