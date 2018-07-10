import {
  RoomDetail
} from "../../interface/room.interface";

import * as r_a from '../actions/booking.action'


export interface RoomArrayIs {
  room: RoomDetail[]
}

export const user_state: RoomArrayIs = {

  room: [],

}



export function reducerRoom(state: RoomArrayIs = user_state, action: r_a.ROOM_ACTIONS): RoomArrayIs {
  switch (action.type) {

    case r_a.ADD_ROOM:
      {
        return {
          ...state,
          room: action.payloads,

        }
      }
    case r_a.VIEW_ROOM:
      {
        return {
          ...state
        }
      }

    default:
      return state
  }
}
