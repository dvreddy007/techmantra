import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRelatedComponent } from './ord-related.component';

describe('OrdRelatedComponent', () => {
  let component: OrderRelatedComponent;
  let fixture: ComponentFixture<OrderRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderRelatedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
