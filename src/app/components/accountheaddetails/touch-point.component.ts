import { from } from 'rxjs';
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../_services/common.service';
import { PopoverConfig } from 'ngx-bootstrap/popover';
import * as moment from 'moment';
interface Participants {
  value: string;
  viewValue: string;
}
interface touch {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-touch-point',
  templateUrl: './touch-point.component.html',
  styleUrls: ['./touch-point.component.css']
})
export class TouchPointComponent implements OnInit {
  @ViewChild('file', { static: false }) file;
  public files: Set<File> = new Set();
  account;
  public htmlContent = '';
  public selectedttype;
  public ttdate;
  public participantsList;
  public ttSubject;
  public resMessage;
  constructor(public dialogRef: MatDialogRef<TouchPointComponent>, private viewService: CommonService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.account = data.pageValue
    console.log(this.account)

  }
  date = new FormControl(new Date());

  participants: Participants[] = [
    { value: 'sridharmudiraj.sridhar@gmail.com', viewValue: 'sridharmudiraj.sridhar@gmail.com' },
    { value: 'sachinsrt22@gmail.com', viewValue: 'sachinsrt22@gmail.com' },
    { value: 'sridharsid22@gmail.com', viewValue: 'sridharsid22@gmail.com' },
    { value: 'dvreddy007@gmail.com', viewValue: 'dvreddy007@gmail.com' },
    { value: 'dvreddy_kv@hotmail.com', viewValue: 'dvreddy_kv@hotmail.com' },
    { value: 'ganti.usha@gmail.com', viewValue: 'ganti.usha@gmail.com' },
    { value: 'kalavr.kala7@gmail.com', viewValue: 'kalavr.kala7@gmail.com' }
  ];

  touchType: touch[] = [
    { value: 'Web meeting', viewValue: 'Web meeting' },
    { value: 'Kick-Off meeting', viewValue: ' Kick-Off meeting' },
    { value: 'Internal meating', viewValue: 'Internal meating' },

  ];
  closeDialog() {
    this.dialogRef.close();
  }
  onDate(event) {
    const momentDate = new Date(event); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    return formattedDate
  }
  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }
  addFiles() {
    this.file.nativeElement.click();
  }
  createTouchPoint() {
    const formData: FormData = new FormData();
    formData.append('accountId', this.account.accountId);
    formData.append('touchPointType', this.selectedttype)
    formData.append('description', this.htmlContent);
    formData.append('touchPointDate', this.onDate(this.ttdate))
    formData.append('participants', this.participantsList);
    formData.append('touchPointSubject', this.ttSubject)
    formData.append('adminEmail', sessionStorage.getItem('currentUsrEmal'))
    if (this.file.nativeElement.files.length > 0) {
      formData.append('file', this.file.nativeElement.files[0], this.file.nativeElement.files[0].name)
      formData.append('fileName', this.file.nativeElement.files[0].name)
    }
    this.viewService.createTouchPoint(formData).subscribe((res) => {
      if (res !== undefined || res !== null || res !== '') {
        this.resMessage = res.message;
      }
    },
      (error) => { }
    );
  }
  ngOnInit() {

  }
}