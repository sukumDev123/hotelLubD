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

import { Observable } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data_info = {
    title: '',
    address: '',
    detail: '',
    photoMain: '',
    phone: ''
  };
  constructor(public _readData: DataShowService, private _router: Router ) {
  }
  
  
  ngOnInit() {
    
    this._readData.readData().subscribe(suc => {
      this.data_info = suc

    }, err => {
      if (err.status === 0) {
        this._router.navigate(['/page/problem'])
      }

    })

    $("#navBar_box ul li a").css({
      "color": "rgb(255,255,255)",

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
        $("#navBar_box ul li a").css({
          "color": "rgb(0,0,0)",
        })
      } else {
        $("#navBar_box ul li a").css({
          "color": "rgb(255,255,255)",
        })
        $("#navBar_box").css({
          "background": 'rgba(0,0,0,0)'
        })
      }

    })

  }


}
