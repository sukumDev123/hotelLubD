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
} from '../../../../../node_modules/@angular/forms';
import {
  HttpClientModule
} from '../../../../../node_modules/@angular/common/http';
import {
  UserGlobalService
} from '../../../services/users/user/user-global.service';

describe('AddRoomComponent', () => {
  let component: AddRoomComponent;
  let fixture: ComponentFixture < AddRoomComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [AddRoomComponent],
        imports: [FormsModule],
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
