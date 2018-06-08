import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {
  @ViewChild("headerCore") headerCoreSave: ElementRef;
  constructor() { }



  ngOnInit() {
    $("#navBar_box ul li a").css({
      "color": "rgb(0,0,0)",
      "font-weight": "bold",

    })
    $("#navBar_box").css({
      "color":"black"
    })
    $(window).scroll(function () {

      if ($(document).scrollTop() > 100) {
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
          "color": "rgba(0,0,0,1)",
          "font-weight": "bold"
        })
        $("#navBar_box").css({
          "position": "relative",
          "background": "rgba(0,0,0,0)",
        })
      }

    })
  }


}
