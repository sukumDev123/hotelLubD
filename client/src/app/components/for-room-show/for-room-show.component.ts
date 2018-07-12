import {
  Component,
  OnInit
} from '@angular/core';
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
  RoomDetail
} from '../../interface/room.interface';
import {
  Booking
} from '../../interface/booking.interface';
import {
  Store
} from '@ngrx/store'
import {
  RoomArrayIs
} from '../../store/reducers/booking.reducers';
import {
  ADD_ROOM
} from '../../store/actions/booking.action';
@Component({
  selector: 'app-for-room-show',
  templateUrl: './for-room-show.component.html',
  styleUrls: ['./for-room-show.component.css']
})
export class ForRoomShowComponent implements OnInit {
  color_style: Array < string > = []
  font_style: Array < string > = []

  rooms: Array < RoomDetail > = []
  style_total_price_all: any = {
    'color': 'black',
    'font_size': '16px'
  }
  booking_now: RoomDetail[]

  constructor(private _user: UserGlobalService, private _room: RoomServiceService, private _err: ErrHandlerService, private _store: Store < RoomArrayIs > ) {}

  ngOnInit() {
    //  this.data_is_defult()
    this.booking_now = []
    
    this._room.showRoom().subscribe((suc) => {
      this.rooms = this.check_room_is_empty(suc.data)
      this.color_style = new Array(this.rooms.length - 1)
      this.font_style = new Array(this.rooms.length - 1)
    }, err => {
      this._err.set_msg_type(err.msg.message, "load data is problem." , 'err' , new Date().getHours() , true   , err.status )
      this.color_style = new Array(0)
      this.font_style = new Array(0)
    })
  }
  check_room_is_empty(data: Array < RoomDetail > , type_show: string = 'all'): Array < RoomDetail > {
    let data_call_back: Array < RoomDetail >
      if (type_show === 'all')
        data_call_back = data

    return data_call_back
  }
  async selete_this_room(room: RoomDetail, index: number) {
    this.color_style[index] = "rgb(44,125,246)"
    this.font_style[index] = "white"
    if (this.booking_now.length) {
      try {
        let exists = await this.check_room_selecte_is_not_exisis(room, this.booking_now)
        this.booking_now.push(exists)

      } catch (error) {

        if (error.status === 'check_room_selecte_is_not_exisis') {
          this.booking_now.splice(error.data, 1)
          this.color_style[index] = 'white'
          this.font_style[index] = "black"

        }
      }
    } else {
      this.booking_now.push(room)
    }

    console.log(this.booking_now)
    this._store.dispatch({
      type: ADD_ROOM,
      payloads: this.booking_now
    })
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



}
