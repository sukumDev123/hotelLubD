import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAdminComponent } from './content-admin.component';

import {
  declarations,
  imports
} from '../../../module.all.test';
import { APP_BASE_HREF } from '../../../../../node_modules/@angular/common';
describe('ContentAdminComponent', () => {
  let component: ContentAdminComponent;
  let fixture: ComponentFixture<ContentAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentAdminComponent ,declarations] ,
      imports : [imports] ,
      providers: [{
        provide: APP_BASE_HREF,
        useValue: '/'
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
