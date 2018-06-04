import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../../../Class/adminInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  http : string = 'http://localhost:3000';
  constructor(private _router : Router , private _http : HttpClient) { }
  signUpAdmin(admin) : Observable<Admin>{
    return this._http.post<Admin>(this.http + '/api/auth/signup/admin' , admin)
  }
  isLogin(){
    return !!localStorage.getItem('adminLogin')
  }
  tokenAdmin(token){
    localStorage.setItem('adminLogin' , token );
  }
}
