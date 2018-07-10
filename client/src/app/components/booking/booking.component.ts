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
import { Booking, CalPriceNum } from '../../interface/booking.interface';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  rooms: Array < RoomDetail > = []
  booking_now: Booking
  date_in: Date = new Date()
  date_out: Date = new Date()
  color_style: Array < string > = []
  cal_price_num: CalPriceNum = {
    total_price_room: 0,
    num_room: 0,
    night_num: 0,
    price_total: 0
  }
  font_style: Array < string > = []
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
    // $('.center_room').hover(function () {
    //   console.log("tes")
    // })
    this.booking_now = this.data_is_defult()
    this._room.showRoom().subscribe((suc) => {
      this.rooms = this.check_room_is_empty(suc.data)
      this.color_style = new Array(this.rooms.length - 1)
      this.font_style = new Array(this.rooms.length - 1)
    }, err => {
      this._err.err_handler_msg(err.msg.message, err.status)
      this.color_style = new Array(0)
      this.font_style = new Array(0)
    })

  }
  check_room_is_empty(data: Array < RoomDetail > ): Array < RoomDetail > {
    let data_call_back: Array < RoomDetail >

      data_call_back = data

    return data_call_back
  }

  check_min_7(date_in, date_out) {
    const date_start: any = new Date(date_in)
    const date_end: any = new Date(date_out)
    const startA = Date.parse(date_start)
    const endA = Date.parse(date_end)
    const gg = endA - startA
    const num_days = ((gg % 31536000000) % 2628000000) / 86400000 // day
    let res = 0
    res = Math.round(num_days) // day
    return res;
  } // Check Date ..

  cal_num_night(e, date_is) {

    if (date_is === 'date_in') {
      this.date_in = new Date(e.target.value)

    } else {
      this.date_out = new Date(e.target.value)
    }
    this.cal_price_num.night_num = this.check_min_7(this.date_in, this.date_out)
    this.cal_price_num = this.cal_price_num_function()
    //  
  }





  async selete_this_room(room: RoomDetail, index: number) {
    this.color_style[index] = "rgb(44,125,246)"
    this.font_style[index] = "white"
    if (this.booking_now.room.length) {
      try {
        let exists = await this.check_room_selecte_is_not_exisis(room, this.booking_now.room)
        this.booking_now.room.push(exists)
        // this.color_style[index] = "black"

      } catch (error) {

        if (error.status === 'check_room_selecte_is_not_exisis') {
          this.booking_now.room.splice(error.data, 1)
          this.color_style[index] = 'white'
          this.font_style[index] = "rgb(44,125,246)"

        }
      }
    } else {
      this.booking_now.room.push(room)
    }
    this.cal_price_num = this.cal_price_num_function()

    // NOTE: this function selecte room and cal price room , num room , and total price 
  }
  check_room_selecte_is_not_exisis(new_room: RoomDetail, new_old: Array < RoomDetail > ): Promise < RoomDetail > {
    return new Promise((res, rej) => {

      new_old.forEach((r, index) => {
        if (r._id === new_room._id) {
          console.log(true, index)
          rej({
            status: 'check_room_selecte_is_not_exisis',
            data: index
          })
          return
        }
      })
      res(new_room)
    })
  }

  cal_price_num_function(): CalPriceNum {
    let cal_: CalPriceNum
    let num_ = this.booking_now.room.length
    let price_ = this.booking_now.room.reduce((sum, room_input) => sum += room_input.priceRoom, 0)
    let nigh_ = this.cal_price_num.night_num ? this.cal_price_num.night_num : 0
    cal_ = {
      total_price_room: price_,
      num_room: num_,
      night_num: nigh_,
      price_total: 0
    }
    return cal_
  }















  //end 
  bookingFunction() {
    // TODO: this function get booking done.
  }
}
