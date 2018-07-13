import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForRoomShowComponent } from './for-room-show.component';
import { imports, declarations } from '../../module.all.test';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';

describe('ForRoomShowComponent', () => {
  let component: ForRoomShowComponent;
  let fixture: ComponentFixture<ForRoomShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForRoomShowComponent , declarations ] ,
      providers: [{
        provide: APP_BASE_HREF,
        useValue: '/'
      }],
      imports :[imports]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForRoomShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
