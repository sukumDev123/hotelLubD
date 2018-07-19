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
  constructor(private _bookList: BookingService, private _msg: ErrHandlerService) {}

  async ngOnInit() {

    try {
      let list_: BookingListCallBack = await this._bookList.bookingListService().toPromise()
      console.log(list_)
      this.loadingShow = true
      this.bookList = list_.data_list
      console.log(this.bookList)
     
    } catch (error) {
      this._msg.set_msg_type(error.error.message, 'Err catch status.', 'err', new Date().getHours(), true, error.status)

    }



  }
  setNameFormat(name): String {
    console.log(name)
    let nameSplit = name.length > 12 ? `${name.split(' ')[0]}...` : name
    return nameSplit
  }
}
