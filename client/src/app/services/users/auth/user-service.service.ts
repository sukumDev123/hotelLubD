import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../../../interface/userinterface'
import { JwtHelperService } from '@auth0/angular-jwt'
import host from '../../../host.global'
import { Router } from '@angular/router';


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
    return this._http.post<User>(`${this._host}/api/user/auth/signup/${data.roles}`, data)
  }

 
  
}
