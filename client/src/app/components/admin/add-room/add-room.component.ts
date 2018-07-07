import { Component, OnInit } from '@angular/core';
import { RoomAdd } from '../../../interface/room.interface';



@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  room : RoomAdd = {
    name : '' ,
    number : 0 ,
    priceRoom : 0
  }
  successMsgValue : string
  errorMsgValue : string
  constructor() { }

  ngOnInit() {
  }

  successMsgFunction( msg : string , delay_time : number  ) : void {
    this.successMsgValue = msg
    setTimeout(() => {
      this.successMsgValue = ''
    } , delay_time)
   // NOTE: This is show messge Success. 
  }
  errorMsg ( msg : string ) : void {
    this.errorMsgValue = msg 
    setTimeout(() => {
      this.errorMsgValue = ''
    })
    // NOTE: This is message Error
  }

  submitAddRoom() : void {
    if(this.room.name && this.room.number && this.room.priceRoom) {
      console.log(this.room)

    }else {
      this.errorMsg("Plasae input every fils.")
    }
  }

}
