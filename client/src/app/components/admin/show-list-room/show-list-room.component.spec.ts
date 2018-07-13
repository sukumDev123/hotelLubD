import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListRoomComponent } from './show-list-room.component';
import { declarations, imports } from '../../../module.all.test';
import { APP_BASE_HREF } from '../../../../../node_modules/@angular/common';

describe('ShowListRoomComponent', () => {
  let component: ShowListRoomComponent;
  let fixture: ComponentFixture<ShowListRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowListRoomComponent , declarations ] ,
      imports : [ imports ] ,
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
});
