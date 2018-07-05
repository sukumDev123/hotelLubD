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
  constructor(private _user: UserGlobalService, private _dataResort: DataShowService) {}


  ngOnInit() {
    this._dataResort.readData().subscribe(suc => {
      this._data_ = suc
      this.img_data = (this.host + this._data_.photoMain)
    })

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
      console.log(suc)
      if (suc.length) {
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

        this.img_keep = suc
        this.success = "Add photo list to resort success."
        setTimeout(() => {
          this.success = ''
        }, 3000)

      }, err => {
        this.error = "Can't add photo list."
        setTimeout(() => {
          this.error = ''
        }, 3000)

      })

    }
  }
  deletePhoto(id: string) {
    ///info/photo
    if (confirm("You want to delete ? ")) {
      this._dataResort.deletePhotoService(id).subscribe(suc => {

        this.img_keep = suc
        this.success = "This photo deleted."
        setTimeout(() => {
          this.success = ''
        }, 3000)

      }, err => {
        this.error = " Can't delete this photo."
        setTimeout(() => {
          this.error = ''
        }, 3000)

      })
    }
  }

  UpdatePhotoMainPath() {
    let img_file = this.img_data.split('/')[4]
    this._dataResort.changePhotoMain(img_file).subscribe(suc => {
      this.img_data = `${this.host}/subPhoto/${suc[0].photoMain}`
      this.success = "Change Photo main Success."
      setTimeout(() => {
        this.success = ''
      }, 3000)
    }, err => {
      this.error = "Can not Change PhotoMain."
      setTimeout(() => {
        this.error = ''
      }, 3000)
    })
  }
  // ------------------------------- > photo handler

  submitUpdate() {
    console.log(this._data_)
  }
}
