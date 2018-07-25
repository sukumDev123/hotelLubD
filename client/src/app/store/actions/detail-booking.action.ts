import {
  Action
} from '@ngrx/store'



export const ADD_DETAIL = "[ADD] add detail List"


export class ADD_DETAIL_ClASS implements Action {
  readonly type = ADD_DETAIL
  constructor(public payloads: any) {}
}


export type DETAIL_ACTION = ADD_DETAIL_ClASS