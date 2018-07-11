import {
  Action
} from '@ngrx/store'
import { Message } from '../reducers/err.reducer';




export const MSG_ADD = "[MSG] MESSAGE"

export class MSGADDACTION implements Action {
  readonly type = MSG_ADD
  constructor(public payloads : Message) {}
}



export type ActionErr = MSGADDACTION
