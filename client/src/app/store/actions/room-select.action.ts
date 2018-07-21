import { Action} from '@ngrx/store'


export const ADD_ROOM_SELECT = "ROOM [SELETE]"


export class ROOM_SELECT  implements Action {
    readonly type = ADD_ROOM_SELECT 
    constructor(public payloads: any ) {

    }
}

export type ROOM_SELECT_ACTION = ROOM_SELECT