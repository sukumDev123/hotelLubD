import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListRoomComponent } from './show-list-room.component';

describe('ShowListRoomComponent', () => {
  let component: ShowListRoomComponent;
  let fixture: ComponentFixture<ShowListRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowListRoomComponent ]
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
