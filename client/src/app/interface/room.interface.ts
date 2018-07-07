export interface RoomAdd {
    name : string ,
    number : number ,
    priceRoom : number
  }
export interface RoomDetail {
    name : string ,
    number : number ,
    create_at : Date ,
    liveDate : Date ,
    liveLast : Date ,
    liveNum : Date ,
    id: string 
}
export interface RoomArray {
    data : Array<RoomDetail> , 
    message : string
}
export interface RoomObject {
    data : RoomDetail ,
    message  : string
}