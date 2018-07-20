import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  DataAddHomeComponent
} from './data-add-home.component';
import {
  declarations,
  imports
} from '../../../module.all.test';
import {
  APP_BASE_HREF
} from '@angular/common';

describe('DataAddHomeComponent', () => {
  let component: DataAddHomeComponent;
  let fixture: ComponentFixture < DataAddHomeComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [DataAddHomeComponent, declarations],
        imports: [imports],
        providers: [{
          provide: APP_BASE_HREF,
          useValue: '/'
        }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAddHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
