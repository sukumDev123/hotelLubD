import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../interface/userinterface';
import { JwtHelperService  } from '@auth0/angular-jwt'


interface UserInfo {
  username : string ,
  displayname : string ,
  firstname : string ,
  lastname : string ,
  roles : Array<string> ,
  _id : string 
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private _host = "http://192.168.99.100:3000";
  constructor(private _http : HttpClient , private jwtHelper : JwtHelperService) { }

  lognInService(data) : Observable<any> {
    return this._http.post<any>(`${this._host}/api/user/auth/signin`,data)
  }
  signUpService(data) : Observable<User> {
    return this._http.post<User>(`${this._host}/api/user/auth/signup/user`,data)
  }

  isLogin(){
    return !!localStorage.getItem('Login')
  }
  setSession(token){
    localStorage.setItem('Login' , token );
  }
  getSession(){
    return localStorage.getItem("Login")
  }
  Logout(){
    if(this.isLogin()){
      localStorage.removeItem("Login");
    }
  }
  UserData() : UserInfo {
    return this.jwtHelper.decodeToken(this.getSession())
  }
  createdJwt() {
    return this.jwtHelper.isTokenExpired(this.getSession())
  }

}
