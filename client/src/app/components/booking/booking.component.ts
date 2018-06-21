import { Component, OnInit } from '@angular/core';
import * as defualtHeader from '../../jquery/core.jquery'

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    defualtHeader.coreJquery()
  }

}
