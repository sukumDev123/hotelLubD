import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from '../../../../node_modules/rxjs';
import {
  Booking, BookingCallBack, BookingListCallBack
} from '../../interface/booking.interface';
import host from '../../host.global';
import {
  catchError,
  map
} from '../../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _host = host
  constructor(private _http: HttpClient) {}

  private err_hander(err): any {
    return {
      message: JSON.stringify(err.error),
      status: err.status
    }
  }
  private sucFunction(data: any): any {
    return {
      message: data.message,
      status: data.status,
      datacall: (data.datacall == 'string') ? JSON.parse(data.datacall) : data.datacall
    }
  }

  bookingNowService(data: Booking): Observable < BookingCallBack > {
    return this._http.post < any > (`${this._host}/api/booking/user/reserve`, data).pipe(
      map(this.sucFunction),
      catchError(this.err_hander)
    )
  }
  bookingListService(limit: Number = 0): Observable < BookingListCallBack > {

    let limit_size = `?start=${limit}`
    return this._http.get < any > (`${this._host}/api/booking/user/history${limit_size}`)
  }
  remove_data_book(id) : Observable<BookingListCallBack> {
    return this._http.delete<any>(`${this._host}/api/booking/user/history/${id}`)
  } 

}
