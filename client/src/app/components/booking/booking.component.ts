import {
  Component,
  OnInit
} from '@angular/core';
import * as defualtHeader from '../../jquery/core.jquery'
import {
  RoomArray,
  RoomDetail
} from '../../interface/room.interface';
import {
  UserGlobalService
} from '../../services/users/user/user-global.service';
import {
  RoomServiceService
} from '../../services/admin/roomS/room-service.service';
import {
  ErrHandlerService
} from '../../services/err-handler/err-handler.service';
import {
  UserInfo
} from '../../interface/userinterface';

interface Booking {
  user_booking: UserInfo,
    room: Array < RoomDetail > ,
    create_at: Date,

    check_in: Date,
    check_out: Date,
    total_price: number,
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  rooms: Array < RoomDetail > = []
  booking_now: Booking
  // room_is_empty: Array < RoomDetail > = []
  constructor(private _user: UserGlobalService, private _room: RoomServiceService, private _err: ErrHandlerService) {}


  ngOnInit() {
    defualtHeader.coreJquery()
    if (this._user.isLogin) {
      this.booking_now = {
        user_booking: this._user.UserData(),
        room: this.rooms,
        create_at: new Date(),
        check_in: new Date(),
        check_out: new Date(),
        total_price: 0,
      }
    }
    this._room.showRoom().subscribe(suc => {
      this.rooms = this.check_room_is_empty(suc.data)
      console.log(suc)
    }, err => this._err.err_handler_msg(err.msg.message, err.status))

  }
  check_room_is_empty(data: Array < RoomDetail > ): Array < RoomDetail > {
    let data_call_back: Array < RoomDetail >

      data_call_back = data

    return data_call_back
  }
  bookingFunction() {

  }
  selete_this_room(room: RoomDetail) {
    if (this.booking_now.room.length) {
      let _test = this.booking_now.room.filter(room_res => room_res._id != room._id )
      console.log(_test)
    } else {
      this.booking_now.room.push(room)
    }

    //console.log(this.booking_now.room)
  }
}
