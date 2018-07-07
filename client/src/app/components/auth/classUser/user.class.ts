class User {
    protected firstname : string = ''
    protected lastname : string = ''
    protected phone : string = ''
    protected email : string = ''
    protected username : string = ''
    protected password : string = ''
    protected password2 : string = ''
    protected roles  : string = ''
    constructor( ) {
    } 
    
  }
export class SignIn extends User {
    constructor(username : string , password : string ) {
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
    constructor(firstname : string , lastname : string , email : string , username : string , password : string , password2 : string,phone : string , roles : string){
      super()
      this.firstname = firstname
      this.lastname = lastname 
      this.email = email
      this.phone = phone
      this.username = username 
      this.password = password
      this.password2 = password2
      this.roles = roles
    }
    
    checkPasswordEqual() : Boolean {
      return this.password === this.password2
    }
    getSignIN () : object {
      return {
        firstname : this.firstname ,
        lastname : this.lastname ,
        email : this.email ,
        phone : this.phone ,
        username : this.username ,
        password : this.password ,
        roles : this.roles
      }
    }
  }