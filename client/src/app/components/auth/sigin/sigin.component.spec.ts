import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiginComponent } from './sigin.component';
import { APP_BASE_HREF } from '@angular/common';
import { declarations, imports } from '../../../module.all.test';

describe('SiginComponent', () => {
  let component: SiginComponent;
  let fixture: ComponentFixture<SiginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiginComponent ,declarations ] ,
      providers: [{
        provide: APP_BASE_HREF,
        useValue: '/'
      }] ,
      imports:[imports]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
