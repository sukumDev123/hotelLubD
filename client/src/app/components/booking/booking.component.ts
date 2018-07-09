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
  color_style: Array < string >
    // room_is_empty: Array < RoomDetail > = []
    constructor(private _user: UserGlobalService, private _room: RoomServiceService, private _err: ErrHandlerService) {}

  data_is_defult() {
    return {
      user_booking: this._user.UserData(),
      room: this.rooms,
      create_at: new Date(),
      check_in: new Date(),
      check_out: new Date(),
      total_price: 0
    }
  }

  ngOnInit() {
    defualtHeader.coreJquery()
    this.booking_now = this.data_is_defult()
    this._room.showRoom().subscribe(suc => {
      this.rooms = this.check_room_is_empty(suc.data)
      this.color_style = new Array(this.rooms.length - 1)
    }, err => {
      this._err.err_handler_msg(err.msg.message, err.status)
      this.color_style = new Array(0)
    })

  }

  check_room_is_empty(data: Array < RoomDetail > ): Array < RoomDetail > {
    let data_call_back: Array < RoomDetail >

      data_call_back = data

    return data_call_back
  }
  bookingFunction() {

  }





  async selete_this_room(room: RoomDetail, index: number) {
    this.color_style[index] = "red"

    if (this.booking_now.room.length) {
      try {
        let exists = await this.check_room_selecte_is_not_exisis(room, this.booking_now.room)
        this.booking_now.room.push(exists)

      } catch (error) {
        this.booking_now.room.splice(error , 1)
        this.color_style[index] = 'black'
        //this.booking_now.room.pop(error)
      }
    } else {

      this.booking_now.room.push(room)
    }

    console.log(this.booking_now.room)



  }
  check_room_selecte_is_not_exisis(new_room: RoomDetail, new_old: Array < RoomDetail > ): Promise < RoomDetail > {
    return new Promise((res, rej) => {
      let filter_ = new_old.filter(room_exists => room_exists.number === new_room.number)
      if (filter_.length) {
        rej(new_room) // false is this room exists in array
      } else {
        res(new_room) // true is this room not exists in array
      }
    })
  }
}
