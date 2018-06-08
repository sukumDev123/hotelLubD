import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreUserComponent } from './core-user.component';

describe('CoreUserComponent', () => {
  let component: CoreUserComponent;
  let fixture: ComponentFixture<CoreUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
