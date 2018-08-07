import { RoomDetail } from "../../interface/room.interface";

import * as is from "../actions/room-select.action";

export interface RoomArrayIs {
  room: RoomDetail[];
}

export const user_state_: RoomArrayIs = {
  room: []
};

export function reducerRoomSelect(
  state: any = user_state_,
  action: is.ROOM_SELECT_ACTION
): RoomArrayIs {
  switch (action.type) {
    case is.ADD_ROOM_SELECT: {
      return {
        ...state,
        room: action.payloads
      };
    }
    case is.SELETE_DEFAULT_ROOM_S: {
      return user_state_;
    }
    default:
      return state;
  }
}
