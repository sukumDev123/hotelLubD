export interface RoomAdd {
  name: string,
    number: number,
    priceRoom: number,
    type : string
}
export interface RoomDetail {
  name: string,
    number: number,
    create_at: string,
    liveDate: Date,
    liveLast: Date,
    liveNum: Date,
    type : string ,
    id: string
}
export interface RoomArray {
  data: Array < RoomDetail > ,
    message: string
}
export interface RoomObject {
  data: RoomDetail,
    message: string
}

