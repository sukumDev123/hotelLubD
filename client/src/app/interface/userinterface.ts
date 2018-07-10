export interface UserInfo {
  username: string,
    displayname: string,
    firstname: string,
    lastname: string,
    roles: Array < string > ,
    _id: string ,
    email : string ,
    phone : string
}
export interface UserToken {
    id_token : string
}