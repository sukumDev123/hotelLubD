import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForRoomShowComponent } from './for-room-show.component';

describe('ForRoomShowComponent', () => {
  let component: ForRoomShowComponent;
  let fixture: ComponentFixture<ForRoomShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForRoomShowComponent ]
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
