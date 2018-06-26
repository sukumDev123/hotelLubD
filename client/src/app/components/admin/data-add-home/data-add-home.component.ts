import { Component, OnInit } from '@angular/core';
import { UserGlobalService } from '../../../services/users/user/user-global.service';
import { DataShowService } from '../../../services/dataShow/data-show.service';
import { DataResort } from '../../../interface/data.interface';

class DataResortClass {
  private _data : DataResort
  constructor(data : DataResort ) {
    this._data = data
  }
  check_Empty() {
    /**
     * For Check Value on _data need to not empty
     */
  }
}

@Component({
  selector: 'app-data-add-home',
  templateUrl: './data-add-home.component.html',
  styleUrls: ['./data-add-home.component.css']
})
export class DataAddHomeComponent implements OnInit {
  private _data_ 
  constructor(private _user : UserGlobalService , private _dataResort : DataShowService) { }

  ngOnInit() {
    this._dataResort.readData().subscribe(suc => {
      this._data_ = new DataResortClass(suc)
    })
  }
  
}
