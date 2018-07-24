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
  let test = [],
    real = []
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
      index: 0,
      status: 0
    }, {
      index: 0,
      status: 0
    }, {
      index: 1,
      status: 1
    }, {
      index: 1,
      status: 1
    }]
    real = [{
      index: 0
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
  // it("test function indexMap ", () => {
  //   let test2 = [{
  //     index: 0
  //   }, {
  //     index: 1
  //   }]
  //   component.indexMap(test).then(data => {
  //     expect(data).toEqual(test2)

  //   })
  // })
  it("test function dataIsNotExistsSelect", async () => {
    let {
      exists,
      existsNot
    } = await component.getDataIndexIsNotEqualtAndGetDataIsNotExists(test)

    let test1 = [{
      index: 1,
      status: 1
    }, {
      index: 1,
      status: 1
    }]
    let test2 = [{
      index: 0,
      status: 0
    }, {
      index: 0,
      status: 0
    }]
    let test3 = [{
      index: 1,
      status: 1
    }]
    let e_index = test3
    let e_not_index = []
    // expect(exists).toEqual(test1)
    // expect(existsNot).toEqual(test2)
    // let findUniQlo = await component.findUniqloIndex(exists, existsNot)
    // expect(findUniQlo.e_index).toEqual(test3)
    // let test5 = {
    //   e_index,
    //   e_not_index
    // }
    // component.indexEndSelect(test5, 1)
    //let end = await component.indexEndSelect(test5, 1)
    //expect(end).toBeTruthy

  })
  it("#test function indexEndSelect", () => {
    let e_index = [{
        index: 1,
        status: 1
      },
      {
        index: 2,
        status: 1
      },
      {
        index : 3 ,
        status : 1
      }
    ]
    let e_not_index = [{
      index: 1,
      status: 0
    }, {
      index: 2,
      status: 0
    }]
    let test5 = {
      e_index,
      e_not_index
    }
    component.indexEndSelect(test5, 4)
  })
});
