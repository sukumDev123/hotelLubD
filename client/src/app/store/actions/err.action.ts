import {
  Action
} from '@ngrx/store'
import { MessageCreated } from '../../interface/msg-create.interface';




export const MSG_ADD = "[MSG] MESSAGE"

export class MSGADDACTION implements Action {
  readonly type = MSG_ADD
  constructor(public payloads :  MessageCreated) {}
}



export type ActionErr = MSGADDACTION
