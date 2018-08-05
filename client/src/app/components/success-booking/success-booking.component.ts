import {
  Component,
  OnInit
} from '@angular/core';
import {
  Store
} from '@ngrx/store'
import {
  ManagetReducer
} from '../../store/reducers/index.reducer';
import {
  ActivatedRoute
} from '../../../../node_modules/@angular/router';
import {
  Observable
} from '../../../../node_modules/rxjs';
import {
  map
} from '../../../../node_modules/rxjs/operators';
import {
  BookingService
} from '../../services/booking/booking.service';
import {
  Booking
} from '../../interface/booking.interface';
import {
  UserGlobalService
} from '../../services/users/user/user-global.service';
import {
  ADD_DETAIL
} from '../../store/actions/detail-booking.action';
import {
  SELETE_DEFAULT_ROOM_S
} from '../../store/actions/room-select.action';
@Component({
  selector: 'app-success-booking',
  templateUrl: './success-booking.component.html',
  styleUrls: ['./success-booking.component.css']
})
export class SuccessBookingComponent implements OnInit {

  bookingId: Observable < string > ;

  loadingShow: boolean = false

  msg_err_show: string

  bookingRealVari: Booking


  constructor(private _store: Store < ManagetReducer > , private _router: ActivatedRoute, private _booking: BookingService, private _user: UserGlobalService) {}


  data_is_defult(): Booking {
    return {
      user_booking: this._user.UserData(),
      room: [],
      create_at: new Date(),
      check_in: new Date(),
      check_out: new Date(),
      total_price: 0,
      night_num: 0,
      _id: '',
      status_enroll: false
    }
  }

  return_queryParams(): Observable < any > {
    return this._router
      .queryParamMap
      .pipe(map(params => params.get('id_bookingList')));
  }
  async ngOnInit() {
    this._store.dispatch({
      type: SELETE_DEFAULT_ROOM_S
    })
    this.bookingRealVari = this.data_is_defult()
    this.bookingId = this.return_queryParams()
    this.bookingId.subscribe(data => this.getShowUserQueryParams(data))

  }
  async getShowUserQueryParams(queryParams) {
    try {
      if (queryParams.length === 24) {
        let bookingList = await this._booking.getBookingListOneData(queryParams).toPromise()
        this.bookingRealVari = bookingList
        console.log(this.bookingRealVari)
        this.loadingShow = true
      } else {
        this.loadingShow = true
        this.msg_err_show = "ไม่สามารถโหลดข้อมูลของ รหัสนี้ได้ id bookingList มีจำนวนไม่เป็นจริง "
      }

    } catch (error) {
      this.loadingShow = true
      this.msg_err_show = "ไม่สามารถโหลดข้อมูลของ รหัสนี้ได้"
    }
  }

  show_detail() {

    let bookingList_data = {
      status_show: true,
      detail: this.bookingRealVari
    }
    this._store.dispatch({
      type: ADD_DETAIL,
      payloads: bookingList_data
    })
  }

}
