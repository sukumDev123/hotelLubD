import { Action } from "@ngrx/store";

export const ADD_ROOM_SELECT = "ROOM [SELETE]";
export const SELETE_DEFAULT_ROOM_S = "DEFAULT [ROOM SELECT]";
export const CHECK_ROOM_IS_EXISTS = "CHECK ROOM IS SELECT NOW";
export class ROOM_SELECT implements Action {
  readonly type = ADD_ROOM_SELECT;
  constructor(public payloads: any) {}
}
export class CHECK_ROOM_IS_EXISTS_CLASS implements Action {
  readonly type = CHECK_ROOM_IS_EXISTS;
  constructor(public payloads: any) {}
}
export class SET_DEFAULT_ROOM_SELECT implements Action {
  readonly type = SELETE_DEFAULT_ROOM_S;
  constructor() {}
}
export type ROOM_SELECT_ACTION =
  | ROOM_SELECT
  | SET_DEFAULT_ROOM_SELECT
  | CHECK_ROOM_IS_EXISTS_CLASS;
