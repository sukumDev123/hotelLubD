import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGlobalService } from '../../../services/users/user/user-global.service';


@Component({
  selector: 'app-admin-core',
  templateUrl: './admin-core.component.html',
  styleUrls: ['./admin-core.component.css']
})
export class AdminCoreComponent implements OnInit {

  constructor(private _router : Router , public _user : UserGlobalService ) { }

  ngOnInit() {
    console.log(`Your Token is : ${this._user.getSession()}`)
  }

}
