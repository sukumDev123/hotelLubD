import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBookingListUserComponent } from './detail-booking-list-user.component';

describe('DetailBookingListUserComponent', () => {
  let component: DetailBookingListUserComponent;
  let fixture: ComponentFixture<DetailBookingListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBookingListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBookingListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
