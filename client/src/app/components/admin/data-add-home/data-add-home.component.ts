import { Component, OnInit } from '@angular/core';
import { UserGlobalService } from '../../../services/users/user/user-global.service';
import { DataShowService } from '../../../services/dataShow/data-show.service';
import { DataResort } from '../../../interface/data.interface';

@Component({
  selector: 'app-data-add-home',
  templateUrl: './data-add-home.component.html',
  styleUrls: ['./data-add-home.component.css']
})
export class DataAddHomeComponent implements OnInit {
  private _data_ : DataResort
  constructor(private _user : UserGlobalService , private _dataResort : DataShowService) { }

  ngOnInit() {
    this._dataResort.readData().subscribe(suc => {
      this._data_ = suc
    })
  }
  dataShow() : DataResort {
    return this._data_
  }
  dataChange()  {

  }

}
