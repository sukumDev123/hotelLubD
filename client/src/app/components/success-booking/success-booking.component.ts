import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { ManagetReducer } from '../../store/reducers/index.reducer';
@Component({
  selector: 'app-success-booking',
  templateUrl: './success-booking.component.html',
  styleUrls: ['./success-booking.component.css']
})
export class SuccessBookingComponent implements OnInit {

  constructor(private _store : Store<ManagetReducer>) { }

  ngOnInit() {
    
  }

}
