import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadUsageCSVComponent } from './uploadusagecsv.component';

describe('PagenotfoundComponent', () => {
    let component: UploadUsageCSVComponent;
    let fixture: ComponentFixture<UploadUsageCSVComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UploadUsageCSVComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadUsageCSVComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
