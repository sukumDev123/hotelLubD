import { Component, OnInit } from "@angular/core";
import { RoomDetail } from "../../interface/room.interface";
import { Store } from "@ngrx/store";
import * as sl from "../../store/actions/room-select.action";
import { ManagetReducer } from "../../store/reducers/index.reducer";
@Component({
  selector: "app-for-room-show",
  templateUrl: "./for-room-show.component.html",
  styleUrls: ["./for-room-show.component.css"]
})
export class ForRoomShowComponent implements OnInit {
  color_style: Array<string> = [];
  font_style: Array<string> = [];

  rooms: Array<RoomDetail> = [];
  style_total_price_all: any = {
    color: "black",
    font_size: "16px"
  };
  booking_now: RoomDetail[];

  constructor(private _store: Store<ManagetReducer>) {}

  ngOnInit() {
    //  this.data_is_defult()
    this.booking_now = [];
    this.storeRooms();
  }
  storeRooms() {
    this._store.select<any>("rooms").subscribe(
      rooms => {
        this.rooms = this.check_room_is_empty(rooms.room);
        this.storeRoomsSelect();
      },
      err => alert(JSON.stringify(err))
    );
  }
  storeRoomsSelect() {
    this._store
      .select<any>("room_select")
      .subscribe(roomselect =>
        this.getRoomsCheckInColorAndPushOldDateSelect(roomselect)
      );
  }
  getRoomsCheckInColorAndPushOldDateSelect(rooms) {
    if (rooms.case === "check") {
      // console.log("bookig", this.booking_now);
      console.log("rooms", this.rooms);
      rooms.room.forEach(room => {
        const indexOf = this.binarySearch(this.rooms, room);
        this.color_style[indexOf] = "white";
        this.font_style[indexOf] = "black";
      });
      this.booking_now = [];
      this._store.dispatch({
        type: sl.SELETE_DEFAULT_ROOM_S
      });
    } else if (rooms.case == "add") {
      console.log("add");
    }
    // this.color_style = this.color_style.map(color => "white");
  }
  binarySearch(array, value) {
    let guess,
      min = 0,
      max = array.length - 1;

    while (min <= max) {
      guess = Math.floor((min + max) / 2);
      if (array[guess].number === value.number) return guess;
      else if (array[guess].number < value.number) min = guess + 1;
      else max = guess - 1;
    }

    return -1;
  }
  check_room_is_empty(
    data: Array<RoomDetail>,
    type_show: string = "all"
  ): Array<RoomDetail> {
    let data_call_back: Array<RoomDetail>;
    if (type_show === "all") data_call_back = data;

    return data_call_back;
  }
  async selete_this_room(room: RoomDetail, index: number) {
    this.color_style[index] = "rgb(44,125,246)";
    this.font_style[index] = "white";
    if (this.booking_now.length) {
      const exists = await this.check_room_selecte_is_not_exisis(
        room,
        this.booking_now
      );
      if (exists.status !== "check_room_selecte_is_not_exisis") {
        this.booking_now.push(exists.data);
      } else {
        this.booking_now.splice(exists.data, 1);
        this.color_style[index] = "white";
        this.font_style[index] = "black";
      }
    } else {
      this.booking_now.push(room);
    }
    // console.log("test", this.booking_now);
    this._store.dispatch({
      type: sl.ADD_ROOM_SELECT,
      payloads: this.booking_now
    });

    // NOTE: this function selecte room and cal price room , num room , and total price
  }
  check_room_selecte_is_not_exisis(
    new_room: RoomDetail,
    new_old: Array<RoomDetail>
  ): Promise<any> {
    return new Promise(res => {
      new_old.forEach((r, index) => {
        if (r._id === new_room._id) {
          res({
            status: "check_room_selecte_is_not_exisis",
            data: index
          });
          return;
        }
      });
      res({ data: new_room });
    });
  }
}
