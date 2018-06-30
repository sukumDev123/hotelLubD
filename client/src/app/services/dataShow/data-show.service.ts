import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import host from '../../host.global'
import { DataResort } from '../../interface/data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataShowService {
  private _host = host
  constructor(private _http: HttpClient) { }

  readData() : Observable<DataResort> {
    return this._http.get<DataResort>(`${this._host}/api/data/info/resort`)
  }
  changeData(data : DataResort) : Observable<DataResort> {
    return this._http.post<DataResort>(`${this._host}/api/data/info/resort` , data)
  }
  changePhoto(photo) : Observable<any>{
    return this._http.post<any>(`${this._host}/api/data/info/photo` , photo)
  }
  deletePhotoService(idDelete) : Observable<any>{
    return this._http.delete<any>(`${this._host}/api/data/info/photo/${idDelete}` )
  }
}
