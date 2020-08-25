import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdDetailsComponent } from './ord-details.component';

describe('OrdDetailsComponent', () => {
  let component: OrdDetailsComponent;
  let fixture: ComponentFixture<OrdDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
