import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAddHomeComponent } from './data-add-home.component';

describe('DataAddHomeComponent', () => {
  let component: DataAddHomeComponent;
  let fixture: ComponentFixture<DataAddHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAddHomeComponent ]
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
