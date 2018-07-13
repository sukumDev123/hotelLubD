import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrComponentComponent } from './err-component.component';
import { imports, declarations } from '../../module.all.test';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';

describe('ErrComponentComponent', () => {
  let component: ErrComponentComponent;
  let fixture: ComponentFixture<ErrComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrComponentComponent , declarations ] ,
      providers: [{
        provide: APP_BASE_HREF,
        useValue: '/'
      }],
      imports :[imports]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
