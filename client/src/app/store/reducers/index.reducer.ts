import { reducerRoom, RoomArrayIs } from "./room.reducers";
import { ActionReducerMap } from "@ngrx/store";
import {  err_reducer } from "./err.reducer";
import { MessageCreated } from "../../interface/msg-create.interface";
import { reducerRoomSelect } from "./room-select.reducer";
import { DetailBooking, reducerOfDetailBooking } from "./detail-booking.reduver";

export interface ManagetReducer {
    rooms : RoomArrayIs ,
    err :  MessageCreated ,
    room_select :   RoomArrayIs ,
    detail_booking_list : DetailBooking
}



export const reducer_total : ActionReducerMap<ManagetReducer> = {
    rooms: reducerRoom ,
    err : err_reducer,
    room_select : reducerRoomSelect ,
    detail_booking_list : reducerOfDetailBooking
}