import { UserServiceService } from "../../../services/users/auth/user-service.service";
class User {
    protected firstname : String = ''
    protected lastname : String = ''
    protected phone : String = ''
    protected email : String = ''
    protected username : String = ''
    protected password : String = ''
    protected password2 : String = ''
    constructor( ) {
    } 
    
  }
export class SignIn extends User {
    constructor(username : String , password : String ) {
      super() 
      this.username = username
      this.password = password
    }
    getDataUser() {
        return {
            username : this.username ,
            password : this.password
        }
    }
    
    
   

  }
export class Signup extends User {
    constructor(firstname : String , lastname : String , email : String , username : String , password : String , password2 : String,phone : String){
      super()
      this.firstname = firstname
      this.lastname = lastname 
      this.email = email
      this.phone = phone
      this.username = username 
      this.password = password
      this.password2 = password2
    }
    checkPasswordEqual() : Boolean {
      return this.password === this.password2
    }
  }