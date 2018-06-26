import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-core',
  templateUrl: './admin-core.component.html',
  styleUrls: ['./admin-core.component.css']
})
export class AdminCoreComponent implements OnInit {

  constructor(private _router : Router ) { }

  ngOnInit() {
   
  }

}
