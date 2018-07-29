import {
  Component,
  OnInit
} from '@angular/core';
import {
  RoomServiceService
} from '../../../services/admin/roomS/room-service.service';
import {
  RoomDetail,
  RoomArray
} from '../../../interface/room.interface';
import {
  UserGlobalService
} from '../../../services/users/user/user-global.service';
import {
  ErrHandlerService
} from '../../../services/err-handler/err-handler.service';
import * as $ from 'jquery'
@Component({
  selector: 'app-show-list-room',
  templateUrl: './show-list-room.component.html',
  styleUrls: ['./show-list-room.component.css']
})
export class ShowListRoomComponent implements OnInit {
  room_type: Array < string > = ['ห้องเดียว', 'ห้องคู่']
  successMsgValue: string
  errorMsgValue: string
  classIsDate: string = "off"
  roomList: Array < RoomDetail > = []
  roomTemp: RoomDetail
  roomListIsNotEmpty: boolean = false
  show_edit_boolean: boolean = false
  display: string[]

  loadingShow: boolean = false
  constructor(private _room: RoomServiceService, private _user: UserGlobalService, private _err: ErrHandlerService) {}

  successMsgFunction(msg: string, data: RoomDetail): void {
    this.successMsgValue = msg
    setTimeout(() => {
      this.successMsgValue = ''
    }, 3000)
    // NOTE: This is show messge Success. 
  }


  dateShow(date: string): string {
    let d = new Date(date)
    let date_format = `วันที่สร้าง : ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`


    return date_format
  }

  showRoomFunction(limitshow: Number = 0): void {
    this._room.showRoom(limitshow).subscribe(suc => {

      if (suc.data.length) {
        this.display = new Array(suc.data.length - 1)
        this.roomListIsNotEmpty = true
        this.roomList = suc.data
        console.log(this.roomList)
      }
      this.loadingShow = true
    }, err => {

      this._err.set_msg_type(err.msg.message, " load array is problem. ", 'err', new Date().getHours(), true, err.status)
    })
  }

  ngOnInit() {
    this.showRoomFunction()
  }

  // jquery



  show_checkin_list(dateIn, index) {

    if (this.display[index] == "block") {
      this.display[index] = 'none'
    } else {
      this.display[index] = "block"

    }


  }
  setDateToString(dateInIn: Date, dateOutIn: Date): String {
    if (dateInIn && dateOutIn) {
      let dateIn = new Date(dateInIn)
      let dateOut = new Date(dateOutIn)
      console.log(dateIn, dateOut)
      let in_ = `${dateIn.getDate()}/${dateIn.getMonth() + 1}/${dateIn.getFullYear()}`
      let out_ = `${dateOut.getDate()}/${dateOut.getMonth() + 1}/${dateOut.getFullYear()}`

      return `วันที่เช็คอิน : ${in_} วันที่เช็คเอ้า : ${out_}`
    }
    return null
  }
  // end jquery
  edit_data(data: RoomDetail) {
    this.show_edit_boolean = true
    this.roomTemp = data
  }
  change_select(e) {
    let edit_ = e.target.value
    this.roomTemp.type = edit_
  }

  edit_page_submit() {
    this._room.editRoom(this.roomTemp, this.roomTemp._id).subscribe(suc => this.successMsgFunction(suc.message, suc.data), err => {

      this._err.set_msg_type(err.msg.message, "Edit is problem.", 'err', new Date().getHours(), true, err.status)
    })

  }

  delete_data(id: string) {
    this._room.deleteRoom(id).subscribe(suc => {
      this.roomList = []
      if (suc.data.length) {
        this.roomListIsNotEmpty = true
        this.roomList = suc.data
        this._err.set_msg_type(`Delete this photo id ${id} success`, "delete is not problem.", 'success', new Date().getHours(), true, 200)
      } else {
        this.roomListIsNotEmpty = false
      }
    }, err => {

      this._err.set_msg_type(err.msg.message, "delete is problem.", 'err', new Date().getHours(), true, err.status)
    })
  }
  async delete_checkInChecoutTime(dateIn, dateOut, indexDate, indexData) {
    this.roomList[indexData].liveDate.splice(indexDate, 1)
    this.roomList[indexData].liveLatest.splice(indexDate, 1)
    try {
      let data: RoomArray = await this._room.removeRoomLive(this.roomList[indexData], this.roomList[indexData]._id).toPromise()
      this._err.set_msg_type(data.message, "Remove date status is success value .", 'success', new Date().getHours(), true, 200)

    } catch (error) {
      this._err.set_msg_type(error.mes, "Remove date status is problem .", 'err', new Date().getHours(), true, error.status)
    }

  }


}
