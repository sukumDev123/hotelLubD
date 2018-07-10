import {
  ActionReducer,
  Action
} from '@ngrx/store'
import {
  Booking
} from '../interface/booking.interface';


export const ADDROOMS = "ADDROOMS"
export const DELETEROOM = "DELETEROOM"
export const UPDATEROOM = "UPDATEROOM"


const bookingReducer = (state: Booking, action: Action) => {
  switch (action.type) {

    default: {

      return state 
    }
  }



}

export default bookingReducer
