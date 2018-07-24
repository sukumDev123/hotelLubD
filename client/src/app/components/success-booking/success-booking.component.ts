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
@Component({
  selector: 'app-success-booking',
  templateUrl: './success-booking.component.html',
  styleUrls: ['./success-booking.component.css']
})
export class SuccessBookingComponent implements OnInit {

  bookingId: Observable < string > ;

  loadingShow: boolean = false

  msg_err_show: string


  constructor(private _store: Store < ManagetReducer > , private _router: ActivatedRoute, private _booking: BookingService) {}

  return_queryParams(): Observable < any > {
    return this._router
      .queryParamMap
      .pipe(map(params => params.get('id_bookingList')));
  }
  async ngOnInit() {
    this.bookingId = this.return_queryParams()
    this.bookingId.subscribe(data => this.getShowUserQueryParams(data))

  }
  async getShowUserQueryParams(queryParams) {
    try {
      if (queryParams.length === 24) {
        let bookingList = await this._booking.getBookingListOneData(queryParams).toPromise()
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

}
