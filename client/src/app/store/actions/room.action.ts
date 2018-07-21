
import {
  Action
} from '@ngrx/store'
import {
  RoomDetail
} from '../../interface/room.interface';


export const ADD_ROOM = "ADD ROOM"
export const CHECK_ROOM = "CHECK ROOM"
export const VIEW_ROOM = "VIEW ROOM"


export class VIEW_ROOM_CLASS implements Action {
  readonly type = VIEW_ROOM
  constructor() {}
}
export class ADD_ROOM_CLASS  implements Action {
  readonly type = ADD_ROOM
  constructor(public payloads: any) {}
}

export class SPLICE_ROOM_CLASS implements Action {
  readonly type = CHECK_ROOM
  constructor(public payloads: any) {}
}


export type ROOM_ACTIONS = VIEW_ROOM_CLASS |
  ADD_ROOM_CLASS |
  SPLICE_ROOM_CLASS 