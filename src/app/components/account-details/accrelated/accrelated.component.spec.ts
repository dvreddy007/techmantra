import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccrelatedComponent } from './accrelated.component';

describe('AccrelatedComponent', () => {
  let component: AccrelatedComponent;
  let fixture: ComponentFixture<AccrelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccrelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccrelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
