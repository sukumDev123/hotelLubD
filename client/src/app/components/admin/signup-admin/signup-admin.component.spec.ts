import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAdminComponent } from './signup-admin.component';
import { imports, declarations } from '../../../module.all.test';
import { APP_BASE_HREF } from '@angular/common';

describe('SignupAdminComponent', () => {
  let component: SignupAdminComponent;
  let fixture: ComponentFixture<SignupAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupAdminComponent , declarations ] ,
      providers: [{
        provide: APP_BASE_HREF,
        useValue: '/'
      }],imports : [imports]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
