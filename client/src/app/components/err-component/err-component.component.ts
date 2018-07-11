import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { Message } from '../../store/reducers/err.reducer';
import {  ManagetReducer } from '../../store/reducers/index.reducer';
@Component({
  selector: 'app-err-component',
  templateUrl: './err-component.component.html',
  styleUrls: ['./err-component.component.css']
})
export class ErrComponentComponent implements OnInit {
  err_msg : Message

  save_store(suc : Message) : void {
    this.err_msg = suc
  }
  constructor ( private _store : Store<ManagetReducer> ) { 
    this._store.select<any>('err').subscribe(suc => this.save_store(suc), err => console.log(err))
   }

  ngOnInit() {
  }

}
