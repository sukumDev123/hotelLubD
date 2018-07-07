import { Component, OnInit } from '@angular/core';
import { RoomServiceService } from '../../../services/admin/roomS/room-service.service';

@Component({
  selector: 'app-show-list-room',
  templateUrl: './show-list-room.component.html',
  styleUrls: ['./show-list-room.component.css']
})
export class ShowListRoomComponent implements OnInit {

  constructor(private _room : RoomServiceService) { }

  ngOnInit() {
    this._room.showRoom().subscribe(suc => {
      console.log(suc)
    })
  }

}
