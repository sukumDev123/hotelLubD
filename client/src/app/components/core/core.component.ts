import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserGlobalService } from '../../services/users/user/user-global.service';


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {
  @ViewChild("headerCore") headerCoreSave: ElementRef;
  constructor(public _user : UserGlobalService   ) { }



  ngOnInit() {
    
  }

 
}
