import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityHeaderComponent } from './opportunityhead.component';

describe('PagenotfoundComponent', () => {
  let component: OpportunityHeaderComponent;
  let fixture: ComponentFixture<OpportunityHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
