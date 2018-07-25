import * as detail_booking from '../actions/detail-booking.action'
import {
  Booking
} from '../../interface/booking.interface';

export interface DetailBooking {
  status_show: boolean
  detail: Booking
}
const detailbooking: DetailBooking = {
  status_show: false,
  detail: {
    user_booking: {
      username: '',
      displayname: '',
      firstname: '',
      lastname: '',
      roles: ['null'],
      _id: '',
      phone: '',
      email: ''
    },
    room: [],
    create_at: new Date(),
    check_in: new Date(),
    check_out: new Date(),
    total_price: 0,
    night_num: 0,
    _id: 0,
    status_enroll: false
  }
}


export function reducerOfDetailBooking(state: DetailBooking = detailbooking, action: detail_booking.DETAIL_ACTION): DetailBooking {
  switch (action.type) {
    case detail_booking.ADD_DETAIL:
      {
        return {
          status_show: action.payloads.status_show,
          detail: action.payloads.detail
        }
      }
    default:
      return state
  }

}
