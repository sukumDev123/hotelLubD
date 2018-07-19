import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserGlobalService
} from '../../../services/users/user/user-global.service';
import {
  DataShowService
} from '../../../services/dataShow/data-show.service';

import _host from '../../../host.global'
import {
  DataResort
} from '../../../interface/data.interface';
import {
  PhotoIs
} from '../../../interface/photoKeep';
import {
  Router
} from '../../../../../node_modules/@angular/router';
import { ErrHandlerService } from '../../../services/err-handler/err-handler.service';

@Component({
  selector: 'app-data-add-home',
  templateUrl: './data-add-home.component.html',
  styleUrls: ['./data-add-home.component.css']
})
export class DataAddHomeComponent implements OnInit {
  private _data_: DataResort = {
    title: '',
    address: '',
    detail: '',
    photoMain: '',
    phone: '',
    title2: '',
    descriton2: ''
  }
  success: string
  error: string
  downloadsFileFirst: boolean = false
  img_data_temp: Array < File >
  host: string = _host
  img_data: string = ''
  changeData: string = ''
  img_keep: PhotoIs
  img_keep_show: boolean = false
  loadingShow: boolean = false
  constructor(private _user: UserGlobalService, private _dataResort: DataShowService, private _router: Router , private _err : ErrHandlerService ) {}

 

  successMsg(data, msg) {
    
      this.img_keep = data
      console.log(data)

      this._err.set_msg_type(msg , `is callback : ${(data.title)}` , 'success' , new Date().getHours() , true , 200   )
    

  }

  ngOnInit() {
    
    this._dataResort.readData().subscribe(suc => {
      this._data_ = suc
      this.img_data = (this.host + this._data_.photoMain)
      this.loadingShow = true
    }, err => this._err.set_msg_type(err.msg.message , `${err.msg.message} is err` , 'err' , new Date().getHours() , true , err.status   ))

  }
  seletePhoto(photo: string) {
    this.img_data = `${this.host}/subPhoto/${photo}`
    this.img_keep_show = false
  }
  upload2(e) {
    this.img_data_temp = < Array < File >> e.target.files

  }
  showDataIs_() {
    this._dataResort.getPhotoKeep().subscribe(suc => {

      if (suc.length) {
        this.img_keep = suc
        this.img_keep_show = true

      } else {
        this.downloadsFileFirst = true
      }
    }, err =>  this._err.set_msg_type(err.msg.message , `${err.msg.message} is err` , 'err' , new Date().getHours() , true , err.status   ))
  }
  saveUploads(e) {

    const formData: any = new FormData();
    const files: Array < File > = this.img_data_temp;
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        formData.append("photo", files[i], files[i]['name']);
      }
      this._dataResort.changePhoto(formData).subscribe(suc => this.successMsg(suc, "Uploads Image SUccess."), err =>
      this._err.set_msg_type(err.msg.message , `${err.msg.message} is err` , 'err' , new Date().getHours() , true , err.status   )

      )

    }
  }
  deletePhoto(id: string) {
    ///info/photo
    if (confirm("You want to delete ? ")) {
      this._dataResort.deletePhotoService(id).subscribe(suc => this.successMsg(suc, "Deleted Image Success"), err => this._err.set_msg_type(err.msg.message , `${err.msg.message} is err` , 'err' , new Date().getHours() , true , err.status   ))
    }
  }

  UpdatePhotoMainPath() {
    let img_file = this.img_data.split('/')[4]
    this._dataResort.changePhotoMain(img_file).subscribe(suc => this.successMsg(`${this.host}/subPhoto/${suc[0].photoMain}`, "Change Photo main Success."), err =>  this._err.set_msg_type(err.msg.message , `${err.msg.message} is err` , 'err' , new Date().getHours() , true , err.status   ))
  }
  // ------------------------------- > photo handler

  submitUpdate() {
    this._dataResort.changeData(this._data_).subscribe(suc => this.successMsg(suc.data , suc.message ) , err =>  this._err.set_msg_type(err.msg.message , `${err.msg.message} is err` , 'err' , new Date().getHours() , true , err.status   ))
  }
}
