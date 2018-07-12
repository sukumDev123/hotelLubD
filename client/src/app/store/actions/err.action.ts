import {
  Action
} from '@ngrx/store'
import {  MessageCreated } from '../reducers/err.reducer';




export const MSG_ADD = "[MSG] MESSAGE"

export class MSGADDACTION implements Action {
  readonly type = MSG_ADD
  constructor(public payloads :  MessageCreated) {}
}



export type ActionErr = MSGADDACTION
