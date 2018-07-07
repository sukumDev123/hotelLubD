import { Component, OnInit } from '@angular/core';



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
    
  }
  errorMsg ( msg : string ) : void {
    this.errorMsgValue = msg 
    setTimeout(() => {
      this.errorMsgValue = ''
    })
  }

  submitAddRoom() : void {
    console.log(this.room)
    if(this.room.name && this.room.number && this.room.priceRoom) {

    }else {
      this.errorMsg("Plasae input every fils.")
    }
  }

}
