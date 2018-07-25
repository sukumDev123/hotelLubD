import {
  UserInfo,
  UserForBooking
} from "./userinterface";
import {
  RoomDetail
} from "./room.interface";

export interface Booking {
  user_booking: UserInfo
  room: RoomDetail[]
  create_at: Date
  check_in: Date
  check_out: Date
  total_price: number
  night_num: number
  _id: any
  status_enroll: boolean
}
export interface CalPriceNum {
  total_price_room: number
  num_room: number
  night_num: number
  price_total: number
}

export interface BookingCallBack {
  datacall: Booking
  message: string
  status: number
}
export interface BookingListCallBack {
  data_list: Booking[]
  message: string
  status: number
  size: number
}
