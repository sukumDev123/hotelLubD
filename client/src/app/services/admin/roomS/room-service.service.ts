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
  RoomDetail
} from '../../../interface/room.interface';

interface RoomCallBack {
  data: RoomAdd,
    msg: String
}

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {
  host: string = _host
  constructor(private _http: HttpClient) {}

  handlerError(err) {
    return throwError({
      msg: err.error,
      status: err.status
    })
  }

  addRoom(data: RoomAdd): Observable < RoomCallBack > {
    return this._http.post < any > (`${this.host}/api/room`, data).pipe(
      catchError(this.handlerError)
    )

  }
  showRoom(): Observable < Array < RoomDetail >> {
    // TODO: to do created service for show room all data return array Room
    return this._http.get < any > (`${this.host}/api`).pipe(
      catchError(this.handlerError)
    )
  }
  deleteRoom() {
    //TODO: To do is deleted serveice for delete room which isn't need.
  }
}
