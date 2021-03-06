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
  MessageCreated
} from '../../interface/msg-create.interface';
import {
  OFF_MSG
} from '../../store/actions/err.action';
@Component({
  selector: 'app-err-component',
  templateUrl: './err-component.component.html',
  styleUrls: ['./err-component.component.css']
})
export class ErrComponentComponent implements OnInit {
  err_msg: MessageCreated
  msg_show: boolean = false
  save_store(suc: MessageCreated): void {
    this.err_msg = suc
    this.msg_show = suc.msg_show



  }
  constructor(private _store: Store < ManagetReducer > ) {

  }

  ngOnInit() {
    this._store.select < any > ('err').subscribe(suc => this.save_store(suc), err => console.log(err))
  }

}
