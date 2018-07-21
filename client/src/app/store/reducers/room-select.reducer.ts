


import {
    RoomDetail
  } from "../../interface/room.interface";
  
  import * as is from '../actions/room-select.action'
  
  
  export interface RoomArrayIs {
    room: RoomDetail[]
  }
  
  export const user_state_: RoomArrayIs = {
  
    room: [],
  
  }
  
  
  
  export function reducerRoomSelect(state: any=  user_state_, action: is.ROOM_SELECT_ACTION): RoomArrayIs {
    switch (action.type) {
  
      case is.ADD_ROOM_SELECT:
        {
          return {
            ...state,
            room: action.payloads,
  
          }
        }
     
      default:
        return state
    }
  }
  