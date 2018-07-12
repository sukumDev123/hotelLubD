import {
  UserInfo
} from "./userinterface";
import {
  RoomDetail
} from "./room.interface";

export interface Booking {
  user_booking: UserInfo,
    room: Array < RoomDetail > ,
    create_at: Date,
    check_in: Date,
    check_out: Date,
    total_price: number,
}
export interface CalPriceNum {
  total_price_room: number,
    num_room: number,
    night_num: number,
    price_total: number
}