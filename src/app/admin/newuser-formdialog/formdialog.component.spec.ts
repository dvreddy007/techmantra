import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdialogComponent } from './formdialog.component';

describe('FormdialogComponent', () => {
  let component: FormdialogComponent;
  let fixture: ComponentFixture<FormdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
