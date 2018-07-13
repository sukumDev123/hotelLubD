import {
  Action
} from '@ngrx/store'
import { MessageCreated } from '../../interface/msg-create.interface';




export const MSG_ADD = "[MSG] MESSAGE"
export const OFF_MSG = "[OFF] MESSAGE"
export class MSGADDACTION implements Action {
  readonly type = MSG_ADD
  constructor(public payloads :  MessageCreated) {}
}
export class MSG_SHOW_OFF implements Action {
  readonly type = OFF_MSG 
  constructor(public payloads : boolean ) {}
}


export type ActionErr = MSGADDACTION | MSG_SHOW_OFF
