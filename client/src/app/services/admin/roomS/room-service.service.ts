import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import _host from '../../../host.global'
import {
  Observable,
  throwError
} from 'rxjs';
import {
  catchError
} from 'rxjs/operators';
import {
  RoomAdd,
  RoomDetail,
  RoomArray,
  RoomObject
} from '../../../interface/room.interface';

interface RoomCallBack {
  data: RoomAdd,
    msg: string
}

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {
  private host: string = _host
  constructor(private _http: HttpClient) {}


  private handlerError(err) {
    return throwError({
      msg: err.error,
      status: err.status
    })
  }

  addRoom(data: RoomAdd): Observable < RoomObject > {
    return this._http.post < any > (`${this.host}/api/room/add`, data).pipe(
      catchError(this.handlerError)
    )

  }
  showRoom(limit: Number = 0): Observable < RoomArray > {
    // TODO: to do created service for show room all data return array Room
    console.log(limit)
    let li = limit ? `?limitSize=${limit}` : ''
    return this._http.get < any > (`${this.host}/api/room/show${li}`)
  }
  editRoom(data: RoomDetail, id: string): Observable < RoomObject > {
    return this._http.put < any > (`${this.host}/api/room/edit/${id}`, data).pipe(
      catchError(this.handlerError)
    )
  }
  deleteRoom(id: string): Observable < RoomArray > {
    //TODO: To do is deleted serveice for delete room which isn't need.
    return this._http.delete < any > (`${this.host}/api/room/delete/${id}`).pipe(
      catchError(this.handlerError)
    )
  }
  removeRoomLive(data: RoomDetail, id: String): Observable < RoomArray > {
    return this._http.put < any > (`${this.host}/api/room/delete/live/${id}`, data).pipe(
      catchError(this.handlerError)
    )
  }
}
