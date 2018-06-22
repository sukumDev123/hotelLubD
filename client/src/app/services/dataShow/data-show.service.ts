import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import host from '../../host.global'

@Injectable({
  providedIn: 'root'
})
export class DataShowService {
  private _host = host
  constructor(private _http: HttpClient) { }

  readData() : Observable<any> {
    return this._http.get<any>(`${this._host}/api/data/info/resort`)
  }
  

}
