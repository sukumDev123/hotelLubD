import {
  Component,
  OnInit
} from '@angular/core';
import {
  RoomAdd,
  RoomDetail
} from '../../../interface/room.interface';
import {
  RoomServiceService
} from '../../../services/admin/roomS/room-service.service';
import {
  UserGlobalService
} from '../../../services/users/user/user-global.service';



@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  room_type: Array < string > = ['ห้องเดียว', 'ห้องคู่']
  room: RoomAdd = {
    name: '',
    number: 0,
    priceRoom: 0,
    type: this.room_type[0]
  }
  successMsgValue: string
  errorMsgValue: string
  constructor(private _room: RoomServiceService, private _user: UserGlobalService) {}

  ngOnInit() {}

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
      this._user.Logout()
    }
    this.errorMsgValue = msg
    setTimeout(() => {
      this.errorMsgValue = ''
    })
    // NOTE: This is message Error
  }

  submitAddRoom(): void {
    if (this.room.name && this.room.number && this.room.priceRoom) {
      this._room.addRoom(this.room).subscribe(suc => this.successMsgFunction(suc.message, suc.data), err => this.errorMsg(err.msg, err.status))

    } else {
      this.errorMsg("Plasae input every fils.", 0)
    }
  }

}
