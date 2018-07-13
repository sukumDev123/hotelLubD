import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  RouterTestingModule
} from '@angular/router/testing';
import {
  AdminCoreComponent
} from './admin-core.component';
import {
  declarations,
  imports
} from '../../../module.all.test';
import { APP_BASE_HREF } from '../../../../../node_modules/@angular/common';

describe('AdminCoreComponent', () => {
  let component: AdminCoreComponent;
  let fixture: ComponentFixture < AdminCoreComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule, imports
        ],
        declarations: [AdminCoreComponent, declarations],

        providers: [{
          provide: APP_BASE_HREF,
          useValue: '/'
        }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
