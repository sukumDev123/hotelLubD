import {
  Action
} from '@ngrx/store'



export const ADD_DETAIL = "[ADD] add detail List"
export const SET_DETAIL_FALSE = "[DETAIL] SET DETAIL SHOW FALSE"

export class ADD_DETAIL_ClASS implements Action {
  readonly type = ADD_DETAIL
  constructor(public payloads: any) {}
}
export class SET_FALSE_CLASS_DETAIL implements Action {
  readonly type= SET_DETAIL_FALSE
  constructor(public status_show:boolean ){}
}


export type DETAIL_ACTION = ADD_DETAIL_ClASS | SET_FALSE_CLASS_DETAIL