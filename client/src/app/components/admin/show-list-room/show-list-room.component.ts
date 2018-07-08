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

@Component({
  selector: 'app-show-list-room',
  templateUrl: './show-list-room.component.html',
  styleUrls: ['./show-list-room.component.css']
})
export class ShowListRoomComponent implements OnInit {
  roomList: Array < RoomDetail >
    roomListIsNotEmpty: boolean = false
  constructor(private _room: RoomServiceService) {}

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
  edit_data() {

  }
  delete_data() {

  }

}
