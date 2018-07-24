import {
  Component,
  OnInit
} from '@angular/core';
import {
  Store
} from '@ngrx/store'
import {
  ManagetReducer
} from '../../store/reducers/index.reducer';
import {
  ActivatedRoute
} from '../../../../node_modules/@angular/router';
import {
  Observable
} from '../../../../node_modules/rxjs';
import {
  map
} from '../../../../node_modules/rxjs/operators';
@Component({
  selector: 'app-success-booking',
  templateUrl: './success-booking.component.html',
  styleUrls: ['./success-booking.component.css']
})
export class SuccessBookingComponent implements OnInit {

  bookingId: Observable < string >
    constructor(private _store: Store < ManagetReducer > , private _router: ActivatedRoute) {}

  ngOnInit() {
    this.bookingId = this._router
      .queryParamMap
      .pipe(map(params => params.get('id_bookingList')));
    // id=5b571437962d0100534b4fad
    this.bookingId.subscribe(data => console.log(data))

  }

}
