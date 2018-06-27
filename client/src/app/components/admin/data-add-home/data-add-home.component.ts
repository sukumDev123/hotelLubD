import { Component, OnInit } from '@angular/core';
import { UserGlobalService } from '../../../services/users/user/user-global.service';
import { DataShowService } from '../../../services/dataShow/data-show.service';
import { DataResortClass } from '../../../class/data-reosrt.class';
import _host from '../../../host.global'
import { DataResort } from '../../../interface/data.interface';


@Component({
  selector: 'app-data-add-home',
  templateUrl: './data-add-home.component.html',
  styleUrls: ['./data-add-home.component.css']
})
export class DataAddHomeComponent implements OnInit {
  private _data_  : DataResort = {
    title: '',
    address: '',
    detail: '',
    photoMain: '',
    phone: '' ,
    title2 : '',
    descriton2 : ''
  }
  host = _host
  constructor(private _user : UserGlobalService , private _dataResort : DataShowService) { }

  ngOnInit() {
    
    this._dataResort.readData().subscribe(suc => {
      let data = new DataResortClass(suc)
      this._data_ = data.getShowData()
      console.log(this._data_ )
    })
  }
  upload2() {
    return this._data_.photoMain
  }
  submitUpdate(){
    console.log(this._data_)
  }
  
}
