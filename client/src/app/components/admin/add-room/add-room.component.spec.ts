import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  AddRoomComponent
} from './add-room.component';
import {
  ErrComponentComponent
} from '../../err-component/err-component.component';
import {
  FormsModule
} from '@angular/forms';
import {
  HttpClientModule
} from '@angular/common/http';
import {
  UserGlobalService
} from '../../../services/users/user/user-global.service';
import { declarations, imports } from '../../../module.all.test';

describe('AddRoomComponent', () => {
  let component: AddRoomComponent;
  let fixture: ComponentFixture < AddRoomComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [AddRoomComponent , declarations],
        imports: [FormsModule , imports],
      })
      .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AddRoomComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
