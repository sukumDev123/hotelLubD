import { Component, OnInit } from '@angular/core';
import { DataShowService } from '../../services/dataShow/data-show.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private _readData : DataShowService) { }

  ngOnInit() {
    this._readData.readData().subscribe(suc => {
      console.log(suc)
    }, err => {
      console.log(err)
    })
  }

}
