import { RoomDetail } from "../../interface/room.interface";

import * as is from "../actions/room-select.action";

export interface RoomArrayIs {
  room: RoomDetail[];
  case: string;
}

export const user_state_: RoomArrayIs = {
  room: [],
  case: "check"
};

export function reducerRoomSelect(
  state: any = user_state_,
  action: is.ROOM_SELECT_ACTION
): RoomArrayIs {
  switch (action.type) {
    case is.ADD_ROOM_SELECT: {
      // console.log("reduc", action.payloads);
      // const rooms = action.payloads.filter(data => !data.length);
      return {
        ...state,
        room: action.payloads,
        case: "add"
      };
    }
    case is.CHECK_ROOM_IS_EXISTS: {
      return {
        ...state,
        case: action.payloads.case,
        room: action.payloads.room
      };
    }
    case is.SELETE_DEFAULT_ROOM_S: {
      return user_state_;
    }
    default:
      return state;
  }
}
