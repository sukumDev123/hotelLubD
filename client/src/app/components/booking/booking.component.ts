import {
  Component,
  OnInit
} from '@angular/core';
import * as defualtHeader from '../../jquery/core.jquery'
import {

  RoomDetail,
  RoomArray
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
import {
  Booking,
  CalPriceNum
} from '../../interface/booking.interface';

import {
  Store
} from '@ngrx/store'
import {
  RoomArrayIs
} from '../../store/reducers/room.reducers';
import {
  ManagetReducer
} from '../../store/reducers/index.reducer';
import {
  MSG_ADD
} from '../../store/actions/err.action';
import {
  BookingService
} from '../../services/booking/booking.service';
import * as room_action from '../../store/actions/room.action';
import {
  Router
} from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  temp_room_session: RoomDetail[]

  loadingShow: boolean = false

  show_new_user_input: boolean = false

  show_button_submit: boolean = false

  msg_show: boolean = false

  rooms: Array < RoomDetail > = []

  booking_now: Booking

  color_style: Array < string > = []

  cal_price_num: CalPriceNum = {
    total_price_room: 0,
    num_room: 0,
    night_num: 0,
    price_total: 0
  }

  style_total_price_all: any = {
    'color': 'black',
    'font_size': '16px'
  }

  font_style: Array < string > = []





  // room_is_empty: Array < RoomDetail > = []
  constructor(private _user: UserGlobalService, private _room: RoomServiceService, private _msg: ErrHandlerService, private _store: Store < ManagetReducer > , private _booking: BookingService, private _router: Router) {}

  data_is_defult(): Booking {
    return {
      user_booking: this._user.UserData(),
      room: this.rooms,
      create_at: new Date(),
      check_in: new Date(),
      check_out: new Date(),
      total_price: 0,
      night_num: 0,
      _id: '',
      status_enroll: false
    }
  }
  getDataRoom() {
    this._store.dispatch({
      type: room_action.VIEW_ROOM
    })
  }

  setRoomOnForRoomShow(rooms: RoomDetail[]) {
    this._store.dispatch({
      type: room_action.ADD_ROOM,
      payloads: rooms
    })
  }

  storeRoomSelect() {
    this._store.select < any > ('room_select').subscribe(suc => {
      this.booking_now.room = suc.room
      this.cal_price_num = this.cal_price_num_function(suc.room)
    }, err => {
      alert(JSON.stringify(err))
    })
  }
  async ngOnInit() {
    defualtHeader.coreJquery()
    this.booking_now = this.data_is_defult()
    try {
      let rooms = await this._room.showRoom().toPromise()
      this.temp_room_session = rooms.data
      this.setRoomOnForRoomShow(rooms.data)
      this.rooms = rooms.data
      this.loadingShow = true

    } catch (error) {
      this._msg.set_msg_type(error.error.message, 'Status is not success loading data array. ', 'err', new Date().getHours(), true, error.status)
    }
    this.storeRoomSelect()
  }



  check_room_is_empty(data: Array < RoomDetail > , type_show: string = 'all'): Array < RoomDetail > {
    let data_call_back: Array < RoomDetail >
      if (type_show === 'all')
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
  // TODO: todo here is not success ....

  getIndexOfDataNotEixstsAndExists(rooms_temp_main: RoomDetail[], select: number): Promise < any > {
    return new Promise(res => {
      let temp = []
      rooms_temp_main.forEach((room, i) => {
        room.liveLatest.forEach((dateLatest, j) => {
          let dateIn = new Date(room.liveDate[j]).valueOf()
          let dateLatestLet = new Date(dateLatest).valueOf()
          if (dateIn <= select && select <= dateLatestLet) {
            temp.push({
              index: i,
              status: 1

            })

          } else {
            temp.push({
              index: i,
              status: 0

            })
          }
        })
      })
      res(temp)
    })
  }
  getDataIndexIsNotEqualtAndGetDataIsNotExists(numberTotal): Promise < any > {
    return new Promise(res => {

      let temp = numberTotal.filter(data => data.status === 0)
      numberTotal = numberTotal.sort((a, b) => a.index - b.index)
      let exists = numberTotal.filter(data => data.status === 1)
      let existsNot = numberTotal.filter(data => data.status === 0)
      res({
        exists,
        existsNot
      })

    })
  }
  

  

  indexMap(indexInput) {

    return new Promise(res => {
      let temp = indexInput
      let indexUniqlo = []
      let forTest
      let temp2 = []
      if (temp.length) {
        temp.forEach((data, i) => {
          for (let j = 0; j < temp.length; j++) {
            if (data.index === temp[j].index) {
              if (indexUniqlo.length) {
                let num = indexUniqlo.length - 1
                if (indexUniqlo[num].index !== data.index) {
                  indexUniqlo.push(data)
                }
              } else {
                indexUniqlo.push(data)
              }
            }

          }
        })

        res(indexUniqlo)

      }
      res([])

    })


  }
  findUniqloIndex(exists, existsNot) {

    return new Promise(async (res) => {
      let e_index = await this.indexMap(exists)
      let e_not_index = await this.indexMap(existsNot)
      res({
        e_index,
        e_not_index
      })

      //console.log(e_index, e_not_index)

    })
  }
  indexEndSelect(indexOfRooms: any, roomsNum: number) {
    return new Promise(async res => {
      let temp = [],
        all = []
      let {
        e_index,
        e_not_index
      } = indexOfRooms
      if (!e_index.length && !e_not_index.length) {
        res([])
      }
      if (e_index.length === roomsNum) {
        res([])
      } else if (e_not_index.length === roomsNum && e_index.length === 0) {
        res(e_not_index)
      } else {
        let data_is_not_exists = await this.dataIsNotExistsSelect(e_index, e_not_index)
        res(data_is_not_exists)
      }


    })
  }
  dataIsNotExistsSelect(exists, notExists) {
    return new Promise(res => {
      let temp = [],
        t = []
      if (exists.length > notExists.length) {
        notExists.forEach((data, i) => {
          if (data.index === exists[i].index) {


          }
        })
      }
    })

  }
  roomIsEmptyCheck(date_select: Date, rooms: RoomDetail[]): Promise < any > {

    return new Promise(async res => {
      const select = new Date(date_select).valueOf()
      console.log(date_select)
      let temp = await this.getIndexOfDataNotEixstsAndExists(rooms, select)
      const {
        exists,
        existsNot
      } = await this.getDataIndexIsNotEqualtAndGetDataIsNotExists(temp)
      const indexOfRooms = await this.findUniqloIndex(exists, existsNot)
      const index_end_selectTed = await this.indexEndSelect(indexOfRooms, rooms.length)

      res(index_end_selectTed)
    })
  }
  async cal_num_night(e, date_is) {
    let room_temps = await this.roomIsEmptyCheck(e.target.value, this.temp_room_session)
    console.log(room_temps)
    if (date_is === 'date_in') {
      this.booking_now.check_in = new Date(e.target.value)
    } else {
      // let check = new Date(e.target.value).valueOf()
      this.booking_now.check_out = new Date(e.target.value)

    }
    this.rooms = []
    // room_temps.forEach(index_ => {
    //   this.rooms.push(this.temp_room_session[index_.index])
    // })
    // this.setRoomOnForRoomShow(this.rooms)
    this.cal_price_num.night_num = this.check_min_7(this.booking_now.check_in, this.booking_now.check_out)
    this.cal_price_num = this.cal_price_num_function(this.booking_now.room)
    // console.log(this.rooms)
    //  
  }
  // TODO: todo here is not success ....


  cal_price_num_function(data: any = []): CalPriceNum {
    let cal_: CalPriceNum
    let num_ = data.length
    let price_ = data.reduce((sum, room_input) => sum += room_input.priceRoom, 0)
    let nigh_ = this.cal_price_num.night_num ? this.cal_price_num.night_num : 1
    let total_ = (num_ || price_ || nigh_) ? this.cal_price_total_everything(price_, nigh_) : 0
    cal_ = {
      total_price_room: price_,
      num_room: num_,
      night_num: nigh_,
      price_total: total_
    }
    return cal_
  }
  cal_price_total_everything(price: number, ngiht: number): number {

    this.style_total_price_all = {
      'color': 'rgb(44,125,246)',
      'font_size': '20px'
    }
    setTimeout(() => {
      this.style_total_price_all = {
        'color': 'black',
        'font_size': '16px'
      }
    }, 1000)

    return (price * ngiht)
  }



  //TODO: Created function for check room empty or not 











  //end 
  bookingFunction() {
    // TODO: this function get booking done.

    if (this.cal_price_num.total_price_room) {
      if (this.check_this_is_user(this.booking_now.user_booking)) {
        if (this.booking_now.room.length) {
          this.booking_now.night_num = this.cal_price_num.night_num
          this.booking_now.total_price = this.cal_price_num.total_price_room
          this.loadingShow = false
          this._booking.bookingNowService(this.booking_now).subscribe(suc => {
            this.booking_now = this.data_is_defult()
            this._msg.set_msg_type(suc.message, `Reserve status is success.`, 'success', new Date().getHours(), true, 200)
            this.loadingShow = true
            let nav = {
              queryParams: {
                'id_bookingList': JSON.stringify(suc)
              }
            }
            this._router.navigate(['/core/success-booking'], nav)
          }, err => this._msg.set_msg_type(err.message, `${err.status} is err`, 'err', new Date().getHours(), true, err.status))
        } else {
          this._msg.set_msg_type('กรุณาเลือหห้องที่ต้องการจอง', '', 'err', new Date().getHours(), true, 1234)
        }
      } else {
        this._msg.set_msg_type('กรุณาใส่ข้อมูลของคุณให้ครบ', '', 'err', new Date().getHours(), true, 1234)
      }
    } else {
      this._msg.set_msg_type('กรุณาทำรายการให้ถูกต้อง', '', 'err', new Date().getHours(), true, 1234)
    }
  }
  check_this_is_user(user_booking: UserInfo) {
    return user_booking.email && user_booking.firstname && user_booking.lastname && user_booking.phone
  }
  // NOTE: Check user is guest or user.
  ok_user_input() {
    console.log(this.booking_now.user_booking)
    if (this.check_this_is_user(this.booking_now.user_booking)) {
      this.show_new_user_input = false
      this.show_button_submit = true
    } else {
      this._msg.set_msg_type('โปรดกรอกข้อมูล ของลูกค้าให้ครบ', 'input is empty feild', 'err', new Date().getHours(), true, 123)
    }
  }
}
