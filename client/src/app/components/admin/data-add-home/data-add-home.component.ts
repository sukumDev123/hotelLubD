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
import {
  DataResortClass
} from '../../../class/data-reosrt.class';
import _host from '../../../host.global'
import {
  DataResort
} from '../../../interface/data.interface';
import {
  PhotoIs
} from '../../../interface/photoKeep';

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
  downloadsFileFirst: boolean = false
  img_data_temp: Array < File >
  host: string = _host
  img_data: string = ''
  changeData: string = ''
  img_keep: PhotoIs
  img_keep_show: boolean = false
  constructor(private _user: UserGlobalService, private _dataResort: DataShowService) {}


  ngOnInit() {
    this._dataResort.readData().subscribe(suc => {
      let data = new DataResortClass(suc)
      this._data_ = data.getShowData()
      this.img_data = (this.host + this._data_.photoMain)
    })

  }
  seletePhoto(photo: string) {
    this.img_data = `${this.host}/subPhoto/${photo}`
    this.img_keep_show = false
  }
  upload2(e) {
    this.img_data_temp = < Array < File >> e.target.files
    console.log(this.img_data_temp)
  }
  showDataIs_() {
    this._dataResort.getPhotoKeep().subscribe(suc => {
      console.log(suc)
      if (!suc) {

        this.img_keep = suc
        this.img_keep_show = true
      } else {
        this.downloadsFileFirst = true
      }
    }, err => console.log(err))
  }
  saveUploads(e) {
    // let arrayFile = []
    // arrayFile[0] = this.img_data_temp

    const formData: any = new FormData();
    const files: Array < File > = this.img_data_temp;
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        formData.append("photo", files[i], files[i]['name']);
      }
      this._dataResort.changePhoto(formData).subscribe(suc => {
        //this.img_keep = JSON.parse(suc).data
        console.log(suc)
        let img_keep = JSON.parse(suc.data)
        this.img_keep = img_keep
        console.log(this.img_keep)
      }, err => console.log(err))

    }
  }
  deletePhoto(id: string) {
    ///info/photo
    this._dataResort.deletePhotoService(id).subscribe(suc => console.log(suc), err => console.log(err))

  }
  submitUpdate() {

  }
  UpdatePhotoMainPath() {
    console.log(this.img_data)
  }
}
