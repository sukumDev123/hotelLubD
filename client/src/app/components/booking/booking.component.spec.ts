import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  BookingComponent
} from './booking.component';
import {
  declarations,
  imports
} from '../../module.all.test';
import {
  APP_BASE_HREF
} from '@angular/common';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture < BookingComponent > ;
  let test = []
  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [BookingComponent, declarations],
        imports: [imports],
        providers: [{
          provide: APP_BASE_HREF,
          useValue: '/'
        }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    test = [{
      index: 0
    }, {
      index: 0
    }, {
      index: 1
    }, {
      index: 1
    }]
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
  it('test forTest function retun', () => {

    let testEq = [{
      index: 0
    }]
    //sexpect(component.forUniqloIndexIs(test, test[0], [])).toEqual(testEq)
    // expect(component.forTest(test , test[2] )).toBe('2')

  })
  it("test function indexMap ", () => {
    let test2 = [{
      index: 0
    }, {
      index: 1
    }]
    component.indexMap(test).then(data => {
      expect(data).toEqual(test2)

    })
  })
  it("test function dataIsNotExistsSelect", () => {

  })
});
