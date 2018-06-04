import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPriceComponent } from './content-price.component';

describe('ContentPriceComponent', () => {
  let component: ContentPriceComponent;
  let fixture: ComponentFixture<ContentPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
