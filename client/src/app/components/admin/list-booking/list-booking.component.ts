import {
  Component,
  OnInit
} from '@angular/core';
import {
  BookingService
} from '../../../services/booking/booking.service';
import {
  ErrHandlerService
} from '../../../services/err-handler/err-handler.service';
import {
  Booking,
  BookingListCallBack
} from '../../../interface/booking.interface';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.css']
})
export class ListBookingComponent implements OnInit {

  loadingShow: boolean = false
  bookList: Booking[] = []
  nameAbosulte: any
  page: number[] = []
  sizeData: number = 0
  show_detail_all_bk: boolean = false
  booking_select: Booking
  constructor(private _bookList: BookingService, private _msg: ErrHandlerService) {}

  async ngOnInit() {

    try {
      let list_: BookingListCallBack = await this._bookList.bookingListService(0).toPromise()
      console.log(list_)
      this.loadingShow = true
      this.bookList = list_.data_list
      this.sizeData = list_.size / this.bookList.length
      this.page = this.pagination(0, this.sizeData)

    } catch (error) {
      this._msg.set_msg_type(error.error.message, 'Err catch status.', 'err', new Date().getHours(), true, error.status)

    }



  }
  pagination(c: number, m: number) {
    let current = c,
      last = m,
      delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || i >= left && i < right) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

  async pageChange(pageNow) {
    this.page = this.pagination(pageNow, this.sizeData)
    try {
      this.loadingShow = false
      let list_: BookingListCallBack = await this._bookList.bookingListService(pageNow * 10).toPromise()
      this.loadingShow = true
      this.bookList = list_.data_list
    } catch (error) {
      this._msg.set_msg_type(error.error.message, 'Err catch status.', 'err', new Date().getHours(), true, error.status)

    }

  }
  setNameFormat(name): String {
    console.log(name)
    let nameSplit = name.length > 12 ? `${name.split(' ')[0]}...` : name
    return nameSplit
  }
  setDateFormate(date): string {
    let date_ = new Date(date)

    return `${date_.getDate()}/${date_.getMonth()}/${date_.getFullYear()}`
  }
  select_bookingList(booking) {
    console.log(booking)
    this.booking_select = booking
    this.show_detail_all_bk = true
  }

  async deleteBookingList(book: Booking, index) {
    // this.bookList.splice(index , 1)
    // let sizeNew =this.bookList.length
    // // this.page = this.pagination(0, sizeNew)
    // console.log(sizeNew)
    this.loadingShow = false

    try {
      let list_: BookingListCallBack = await this._bookList.remove_data_book(book._id).toPromise()
      this.bookList = list_.data_list
      this._msg.set_msg_type(list_.message, "Delete status is success.", 'success', new Date().getHours(), true, 200)
      this.loadingShow = true
      this.sizeData = list_.size / this.bookList.length
      this.page = this.pagination(0, this.sizeData)

    } catch (error) {
      this._msg.set_msg_type(error.error.message, "Delete status is not success.", 'err', new Date().getHours(), true, error.status)

    }
  }
}
