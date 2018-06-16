import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from "jquery";
import { UserServiceService } from '../../services/users/auth/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {
  @ViewChild("headerCore") headerCoreSave: ElementRef;
  constructor(public _user : UserServiceService , private _router : Router) { }




  ngOnInit() {
    
  }

 
}
