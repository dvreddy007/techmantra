import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsListComponent } from './viewslist.component';

describe('ViewsListComponent', () => {
  let component: ViewsListComponent;
  let fixture: ComponentFixture<ViewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
