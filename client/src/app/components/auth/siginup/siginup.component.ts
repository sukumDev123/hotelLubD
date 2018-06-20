import { Component, OnInit } from '@angular/core';
import * as defualtHeader from '../../../jquery/core.jquery'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-siginup',
  templateUrl: './siginup.component.html',
  styleUrls: ['./siginup.component.css']
})


export class SiginupComponent implements OnInit {
  auth  = {
    firstname : '' ,
    lastname : '',
    email : '',
    phone : '',
    username : '',
    password : '',
    password2 : '',
  }
  constructor() {
   }

  ngOnInit() {
   
    defualtHeader.coreJquery()
  }

}

