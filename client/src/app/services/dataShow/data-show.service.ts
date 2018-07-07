import {
  Injectable,
  ErrorHandler
} from '@angular/core'
import {
  HttpClient
} from '@angular/common/http'
import {
  Observable, throwError
} from 'rxjs'
import host from '../../host.global'
import {
  DataResort
} from '../../interface/data.interface'
import {
  PhotoIs
} from '../../interface/photoKeep';
import {
  catchError
} from 'rxjs/operators'
import { Router } from '@angular/router';
import { UserGlobalService } from '../users/user/user-global.service';

interface DataResortCallBack {
  message : string ,
  data : DataResort
}


@Injectable({
  providedIn: 'root'
})


export class DataShowService {
  private _host = host
  constructor(private _http: HttpClient , private _user : UserGlobalService) {}

  readData(): Observable < DataResort > {
    return this._http.get < DataResort > (`${this._host}/api/data/info/resort`).pipe(
      catchError(this.errHandler)
    )
  }
  changeData(data: DataResort): Observable < DataResortCallBack > {
    return this._http.post < any > (`${this._host}/api/data/info/resort`, data).pipe(
      catchError(this.errHandler)
      
    )
  }
  errHandler(err  ) {
    return throwError({
      msg : err.error , 
      status : err.status
    })
  }
  changePhoto(photo): Observable < any > {
    return this._http.post < any > (`${this._host}/api/data/info/photo`, photo).pipe(
      catchError(this.errHandler)
    )
  }
  deletePhotoService(idDelete): Observable < any > {
    return this._http.delete < any > (`${this._host}/api/data/info/photo/${idDelete}`).pipe(
      catchError(this.errHandler)
    )
  }
  getPhotoKeep(): Observable < any > {
    return this._http.get < any > (`${this._host}/api/data/info/photo`).pipe(
      catchError(this.errHandler)
    )
  }
  changePhotoMain(file: string): Observable < any > {
    return this._http.put < any > (`${this._host}/api/data/info/photo/${file}`, file).pipe(
      catchError(this.errHandler)
    )
  }
}
