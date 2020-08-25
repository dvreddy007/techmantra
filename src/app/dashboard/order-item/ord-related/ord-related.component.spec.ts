import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdRelatedComponent } from './ord-related.component';

describe('OrdRelatedComponent', () => {
  let component: OrdRelatedComponent;
  let fixture: ComponentFixture<OrdRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
