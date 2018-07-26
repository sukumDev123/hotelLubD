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
  Booking
} from '../../interface/booking.interface';
import {
  DetailBooking
} from '../../store/reducers/detail-booking.reduver';
@Component({
  selector: 'app-detail-booking-list-user',
  templateUrl: './detail-booking-list-user.component.html',
  styleUrls: ['./detail-booking-list-user.component.css']
})
export class DetailBookingListUserComponent implements OnInit {
  show_detail_all_bk: boolean = false
  booking_select: Booking
  constructor(private _store: Store < ManagetReducer > ) {}

  ngOnInit() {
    console.log('detail')
    this._store.select < any > ('detail_booking_list').subscribe(data => this.setDataSHow(data))

  }
  setDataSHow(dbl: DetailBooking) {
    console.log(dbl)
    this.booking_select = dbl.detail
    this.show_detail_all_bk = dbl.status_show
  }
  status_booking(bookingStatus) {
    return bookingStatus ? "ยืนยัน" : "รอการยืนยัน"
  }
}
