import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../../../interface/adminInterface';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  http: string = 'http://localhost:3000';
  constructor(private _router: Router, private _http: HttpClient) { }
  signUpAdmin(admin): Observable<Admin> {
    return this._http.post<Admin>(this.http + '/api/user/auth/signup/admin', admin)
  }

}
