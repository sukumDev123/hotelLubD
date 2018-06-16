import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShowService {
  private host = 'http://192.168.99.100:3000';
  constructor(private _http: HttpClient) { }

  readData() : Observable<any> {
    return this._http.get<any>(`${this.host}/api/data/info/resort`);
  }
  

}
