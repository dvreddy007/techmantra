import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprofileFormdialogComponent } from './newprofile-formdialog.component';

describe('NewprofileFormdialogComponent', () => {
  let component: NewprofileFormdialogComponent;
  let fixture: ComponentFixture<NewprofileFormdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewprofileFormdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewprofileFormdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
