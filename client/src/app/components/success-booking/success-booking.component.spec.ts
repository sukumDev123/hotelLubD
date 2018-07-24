import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  SuccessBookingComponent
} from './success-booking.component';
import {
  declarations,
  imports
} from '../../module.all.test';
import {
  APP_BASE_HREF
} from '../../../../node_modules/@angular/common';

describe('SuccessBookingComponent', () => {
  let component: SuccessBookingComponent;
  let fixture: ComponentFixture < SuccessBookingComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [SuccessBookingComponent, declarations],
        imports: [imports],
        providers: [{
          provide: APP_BASE_HREF,
          useValue: '/'
        }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test route query params id', () => {
    
  })
});
