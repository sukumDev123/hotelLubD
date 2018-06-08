import { Component, OnInit } from '@angular/core';
import { DataShowService } from '../../services/dataShow/data-show.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data_info: any = {};
  constructor(private _readData: DataShowService) { }

  ngOnInit() {
    this._readData.readData().subscribe(suc => {
      this.data_info = suc.data;
    }, err => {
      console.log(err)
    })

    
  }

}
