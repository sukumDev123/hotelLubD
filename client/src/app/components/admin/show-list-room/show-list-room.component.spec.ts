import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ShowListRoomComponent
} from './show-list-room.component';
import {
  declarations,
  imports
} from '../../../module.all.test';
import {
  APP_BASE_HREF
} from '@angular/common';
import {
  RoomServiceService
} from '../../../services/admin/roomS/room-service.service';
import {
  UserGlobalService
} from '../../../services/users/user/user-global.service';

describe('ShowListRoomComponent', () => {
  let component: ShowListRoomComponent;
  let fixture: ComponentFixture < ShowListRoomComponent > ;
 
 

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [ShowListRoomComponent, declarations],
        imports: [imports],
        providers: [{
          provide: APP_BASE_HREF,
          useValue: '/'
        }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
  // it("Date show format day/month/year", () => {
  //   expect(component.dateShow(new Date().toString())).toBe('วันที่สร้าง : 18/6/2018')

  // })
  
  // it("test dateIn : dateOut", () => {
  //   expect(component.setDateToString(new Date('06/06/2018'), new Date('06/07/2018'))).toBe(`วันที่เช็คอิน : 3/5/2018 วันที่่ช็ตเอ้า : 4/5/2018`)
  // })
 

});
