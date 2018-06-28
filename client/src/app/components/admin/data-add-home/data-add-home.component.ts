import { Component, OnInit } from '@angular/core';
import { UserGlobalService } from '../../../services/users/user/user-global.service';
import { DataShowService } from '../../../services/dataShow/data-show.service';
import { DataResortClass } from '../../../class/data-reosrt.class';
import _host from '../../../host.global'
import { DataResort } from '../../../interface/data.interface';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

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
  img_data_temp : File
  host : string = _host
  img_data : string = ''
  changeData : string = ''

  constructor(private _user : UserGlobalService , private _dataResort : DataShowService) { }

 
  ngOnInit() {
    console.log(this.img_data)
    this._dataResort.readData().subscribe(suc => {
      let data = new DataResortClass(suc)
      this._data_ = data.getShowData()
      this.img_data = (this.host + this._data_.photoMain)
    
    })

  }
  upload2(e) {
    this.img_data_temp = <File> e.target.files[0]
  }
  saveUploads(e){
    console.log(this.img_data_temp)
  }
  submitUpdate(){
    
  }
  
}
