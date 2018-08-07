import { Component, OnInit } from "@angular/core";
import { DataShowService } from "../../services/dataShow/data-show.service";
import { Router } from "@angular/router";

import _host from "../../host.global";
import { UserGlobalService } from "../../services/users/user/user-global.service";
import { DataResort } from "../../interface/data.interface";
import { BookingService } from "../../services/booking/booking.service";
import { Store } from "../../../../node_modules/@ngrx/store";
import { ManagetReducer } from "../../store/reducers/index.reducer";
import { ADD_DETAIL } from "../../store/actions/detail-booking.action";
import { ErrHandlerService } from "../../services/err-handler/err-handler.service";
declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  host = _host;
  loadingShow: boolean = false;
  data_info: DataResort = {
    title: "",
    address: "",
    detail: "",
    photoMain: "",
    phone: "",
    title2: "",
    descriton2: ""
  };
  searchFindBooking: string = "";
  constructor(
    public _readData: DataShowService,
    private _router: Router,
    private _user: UserGlobalService,
    private _booking: BookingService,
    private _store: Store<ManagetReducer>,
    private _msg: ErrHandlerService
  ) {}

  ngOnInit() {
    this._user.checkTokenExp();
    this._readData.readData().subscribe(
      suc => {
        this.data_info = suc;
        this.loadingShow = true;
      },
      err => {
        if (err.status === 0) {
          this._router.navigate(["/page/problem"]);
        }
      }
    );

    $("#navBar_box").css({
      position: "fixed",
      width: "100%",
      "z-index": "105"
    });
    $(window).scroll(function() {
      if ($(document).scrollTop() > 300) {
        $("#navBar_box").css({
          position: "fixed",
          width: "100%",
          "z-index": "105",
          background: "rgba(255,255,255,0.8)"
        });
      } else {
        $("#navBar_box").css({
          background: "rgba(0,0,0,0)"
        });
      }
    });
  }

  async findIdBookingList() {
    if (this.searchFindBooking) {
      try {
        if (this.searchFindBooking.length == 24) {
          let find_id = await this._booking
            .getBookingListOneData(this.searchFindBooking)
            .toPromise();
          console.log(find_id);
          this._store.dispatch({
            type: ADD_DETAIL,
            payloads: {
              detail: find_id,
              status_show: true
            }
          });
        } else {
          this._msg.set_msg_type(
            "จำนวนของ id booking list ไม่เป็นจริงโปรดตรวจสอบจำนวนของ id ด้วยครับ ",
            "status is length of id booking.",
            "err",
            new Date().getHours(),
            true,
            404
          );
        }
      } catch (error) {
        let error_show =
          typeof error.error.message == "string"
            ? error.error.message
            : "id มีปัญหาโปรดตรวจสอบ id ของท่าน แล้วกลับมาค้นหาอีกครั้ง";
        this._msg.set_msg_type(
          error_show,
          `I can't find id bookinglist status.`,
          "err",
          new Date().getHours(),
          true,
          error.status || 404
        );
      }
    }
  }
  test(data) {
    console.log(data);
  }
}
