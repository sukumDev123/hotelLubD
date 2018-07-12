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
import {
  ErrHandlerService
} from '../../../services/err-handler/err-handler.service';



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
  constructor(private _room: RoomServiceService, private _user: UserGlobalService, private _err: ErrHandlerService) {}

  ngOnInit() {}

  successMsgFunction(msg: string, data: RoomDetail): void {
    this.successMsgValue = msg
    console.log(data)
    setTimeout(() => {
      this.successMsgValue = ''
    }, 3000)
    // NOTE: This is show messge Success. 
  }

  submitAddRoom(): void {
    if (this.room.name && this.room.number && this.room.priceRoom) {
      this._room.addRoom(this.room).subscribe(suc => this.successMsgFunction(suc.message, suc.data), err => {

        this._err.set_msg_type(err.msg.message, 'Add room is problem.', 'err', new Date().getHours(), true, err.status)
      })

    } else {
      this._err.set_msg_type('ใส่ให้ครับทุกช่องด้วยครับ.' ,'feild is empty .' , 'err' , new Date().getHours() , true , 123 )
    }
  }

}
