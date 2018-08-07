import { Component, OnInit } from "@angular/core";
import { UserGlobalService } from "../../services/users/user/user-global.service";
import { RoomServiceService } from "../../services/admin/roomS/room-service.service";
import { ErrHandlerService } from "../../services/err-handler/err-handler.service";
import { RoomDetail } from "../../interface/room.interface";
import { Booking } from "../../interface/booking.interface";
import { Store } from "@ngrx/store";
import { RoomArrayIs } from "../../store/reducers/room.reducers";
import { ADD_ROOM } from "../../store/actions/room.action";
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

  constructor(
    private _user: UserGlobalService,
    private _room: RoomServiceService,
    private _err: ErrHandlerService,
    private _store: Store<ManagetReducer>
  ) {}

  ngOnInit() {
    //  this.data_is_defult()
    this.booking_now = [];
    this.storeRooms();
    this.storeRoomsSelect();
  }
  storeRooms() {
    this._store
      .select<any>("rooms")
      .subscribe(
        rooms => (this.rooms = this.check_room_is_empty(rooms.room)),
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
      console.log("bookig", this.booking_now);
      this.rooms.forEach((roo, index) => {
        this.color_style[index] = "white";
        this.font_style[index] = "black";
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
