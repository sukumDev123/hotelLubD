export interface RoomAdd {
  name: string,
    number: number,
    priceRoom: number,
    type: string
}
export interface RoomDetail {
  name: string,
    number: number,
    create_at: Date,
    liveDate: Date[],
    liveLatest: Date[],
    
    type: string,
    _id: string,
    priceRoom: number
}
export interface RoomArray {
  data: Array < RoomDetail > ,
    message: string
}
export interface RoomObject {
  data: RoomDetail,
    message: string
}
