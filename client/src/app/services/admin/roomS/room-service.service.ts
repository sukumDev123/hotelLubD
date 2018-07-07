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
  showRoom(): Observable < RoomArray> {
    // TODO: to do created service for show room all data return array Room
    return this._http.get < any > (`${this.host}/api/room/show`).pipe(
      catchError(this.handlerError)
    )
  }
  deleteRoom() {
    //TODO: To do is deleted serveice for delete room which isn't need.
  }
}
