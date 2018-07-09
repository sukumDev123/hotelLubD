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
import * as $ from 'jquery'
interface Booking {
  user_booking: UserInfo,
    room: Array < RoomDetail > ,
    create_at: Date,
    check_in: Date,
    check_out: Date,
    total_price: number,
}
interface CalPriceNum {
  total_price: number,
    num_room: number
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  rooms: Array < RoomDetail > = []
  booking_now: Booking
  color_style: Array < string > = []
  cal_price_num: CalPriceNum = {
    total_price: 0,
    num_room: 0
  }
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
    $('.center_room').hover(function() {
      console.log("tes")
    } )
    this.booking_now = this.data_is_defult()
    this._room.showRoom().subscribe((suc) => {
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
        //console.log(error)
        //this.booking_now.room.splice(index, 1)
        //this.color_style[index] = 'black'
        //this.booking_now.room.pop(error)
      }
    } else {
      this.booking_now.room.push(room)
    }

    this.cal_price_num = this.cal_price_num_function()

    console.log(this.booking_now.room)



  }
  check_room_selecte_is_not_exisis(new_room: RoomDetail, new_old: Array < RoomDetail > ): Promise < RoomDetail > {
    return new Promise((res, rej) => {
      let filter_ = new_old.filter(room_exists => room_exists.number === new_room.number)
      if (filter_.length) {
        rej(false) // false is this room exists in array
      } else {
        res(new_room) // true is this room not exists in array
      }
    })
  }

  cal_price_num_function(): CalPriceNum {
    let cal_: CalPriceNum
    let temp = 0
    //let price_ = this.booking_now.room.reduce((sum, room_input) => sum = room_input.priceRoom, 0)
    this.booking_now.room.forEach(suc => {
      temp += suc.priceRoom
    })
    cal_ = {
      total_price: temp,
      num_room: 0
    }
    return cal_
  }
}
