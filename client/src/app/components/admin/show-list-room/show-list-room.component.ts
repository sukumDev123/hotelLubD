import {
  Component,
  OnInit
} from '@angular/core';
import {
  RoomServiceService
} from '../../../services/admin/roomS/room-service.service';
import {
  RoomDetail
} from '../../../interface/room.interface';
import {
  UserGlobalService
} from '../../../services/users/user/user-global.service';

@Component({
  selector: 'app-show-list-room',
  templateUrl: './show-list-room.component.html',
  styleUrls: ['./show-list-room.component.css']
})
export class ShowListRoomComponent implements OnInit {
  room_type: Array < string > = ['ห้องเดียว', 'ห้องคู่']
  successMsgValue: string
  errorMsgValue: string
  roomList: Array < RoomDetail > = []
  roomTemp: RoomDetail
  roomListIsNotEmpty: boolean = false
  show_edit_boolean: boolean = false
  constructor(private _room: RoomServiceService, private _user: UserGlobalService) {}

  successMsgFunction(msg: string, data: RoomDetail): void {
    this.successMsgValue = msg
    console.log(data)
    setTimeout(() => {
      this.successMsgValue = ''
    }, 3000)
    // NOTE: This is show messge Success. 
  }
  errorMsg(msg: string, status: number): void {
    if (status === 401) {
      alert(msg)
      this._user.Logout()
    }
    this.errorMsgValue = msg
    setTimeout(() => {
      this.errorMsgValue = ''
    })
    // NOTE: This is message Error
  }


  dateShow(date: string): string {
    let d = new Date(date)
    let date_format = `วันที่สร้าง : ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`


    return date_format
  }
  ngOnInit() {
    this._room.showRoom().subscribe(suc => {

      if (suc.data.length) {
        this.roomListIsNotEmpty = true
        this.roomList = suc.data
        this.roomList.map(suc => suc.create_at = this.dateShow(suc.create_at))
        console.log(this.roomList)
      }
    })
  }
  edit_data(data: RoomDetail) {
    this.show_edit_boolean = true
    this.roomTemp = data
    console.log(this.roomTemp)
  }
  change_select(e) {
    let edit_ = e.target.value
    this.roomTemp.type = edit_
  }

  edit_page_submit() {
    this._room.editRoom(this.roomTemp, this.roomTemp._id).subscribe(suc => this.successMsgFunction(suc.message, suc.data), err => this.errorMsg(err.msg.message, err.status))

  }

  delete_data() {

  }

}
