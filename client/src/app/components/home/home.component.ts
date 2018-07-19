import {
  Component,
  OnInit
} from '@angular/core';
import {
  DataShowService
} from '../../services/dataShow/data-show.service';
import {
  Router
} from '@angular/router';
import * as $ from 'jquery'

import _host from '../../host.global'
import {
  UserGlobalService
} from '../../services/users/user/user-global.service';
import {
  DataResort
} from '../../interface/data.interface';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  host = _host
  loadingShow: boolean = false
  data_info: DataResort = {
    title: '',
    address: '',
    detail: '',
    photoMain: '',
    phone: '',
    title2: '',
    descriton2: ''
  };
  constructor(public _readData: DataShowService, private _router: Router, private _user: UserGlobalService) {}


  ngOnInit() {
    this._user.checkTokenExp()
    this._readData.readData().subscribe(suc => {
      this.data_info = suc
      this.loadingShow = true
    }, err => {
      if (err.status === 0) {
        this._router.navigate(['/page/problem'])
      }
    })

    $("#navBar_box").css({
      "position": "fixed",
      "width": "100%",
      "z-index": "105"
    })
    $(window).scroll(function () {

      if ($(document).scrollTop() > 300) {
        $("#navBar_box").css({
          "position": "fixed",
          "width": "100%",
          "z-index": "105",
          "background": "rgba(255,255,255,0.8)"
        })

      } else {

        $("#navBar_box").css({
          "background": 'rgba(0,0,0,0)'
        })
      }

    })

  }


}
