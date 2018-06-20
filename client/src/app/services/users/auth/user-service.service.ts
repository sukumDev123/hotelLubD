import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../interface/userinterface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private _host = "http://192.168.99.100:3000";
  constructor(private _http : HttpClient) { }

  lognInService(data) : Observable<any> {
    return this._http.post<any>(`${this._host}/api/user/auth/signin`,data)
  }
  signUpService(data) : Observable<User> {
    return this._http.post<User>(`${this._host}/api/user/auth/siginup/user`,data)
  }

  

  isLogin(){
    return !!localStorage.getItem('Login')
  }
  setSession(token){
    localStorage.setItem('Login' , JSON.stringify(token) );
    console.log(localStorage.getItem('Login'))
  }
  getSession(){
    return JSON.parse(localStorage.getItem("Login"));
  }
  Logout(){
    if(this.isLogin()){
      localStorage.removeItem("Login");
    }
  }
}
