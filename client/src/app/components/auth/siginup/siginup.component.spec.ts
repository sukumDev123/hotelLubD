import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiginupComponent } from './siginup.component';
import { imports, declarations } from '../../../module.all.test';
import { APP_BASE_HREF } from '../../../../../node_modules/@angular/common';

describe('SiginupComponent', () => {
  let component: SiginupComponent;
  let fixture: ComponentFixture<SiginupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiginupComponent , declarations ] ,
      providers: [{
        provide: APP_BASE_HREF,
        useValue: '/'
      }],
      imports :[imports]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiginupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
