import {
  ActionReducer,
  Action
} from '@ngrx/store'



interface Book {
  name: string,
    number: number,
    priceRoom: number,
    liveDate: Date,
    liveLatest: Date
}
export interface Booking {
  room: Array < Book > ,
    state: boolean,
    checkIn: Date,
    checkOut: Date,
    totalPrice: number,
    userBooking: {}
}
export const initialState: Booking = {
  room: [{
      name: "01",
      number: 1,
      priceRoom: 400,
      liveDate: new Date(),
      liveLatest: new Date()
    },
    {
      name: "02",
      number: 2,
      priceRoom: 400,
      liveDate: new Date(),
      liveLatest: new Date()
    }
  ],
  state: false,
  checkIn: new Date(),
  checkOut: new Date(),
  totalPrice: 0,
  userBooking: {}
}

const bookingReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SHOWBOOKING":
      {
        return {
          ...state
        }
      }
    case "ADD":
      {
        let total = 0
        state.room.forEach(suc => {
          total = total + suc.priceRoom
        })
        return {
          ...state,
          room: [
            ...state.room
          ],
          totalPrice: total
        }
      }
    default:
      {

        return state
      }
  }



}

export default bookingReducer
