import { from } from 'rxjs';
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CommonService } from '../../_services/common.service';
import { PopoverConfig } from 'ngx-bootstrap/popover';
import * as moment from 'moment';
interface successFlow {
  value: string;
  viewValue: string;
}
interface Priority {
  value: string;
  viewValue: string;
}
interface Users {
  userId: number;
  userName: string;
}
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @ViewChild('file', { static: false }) file;
  public files: Set<File> = new Set();
  account;
  public htmlContent = '';
  public singleSuccessFlow;
  public userData;
  public priorityValue;
  public taskTitle;
  public dueDate;
  public singleUser;
  public resMessage;
  constructor(public dialogRef: MatDialogRef<AddTaskComponent>, private viewService: CommonService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.account = data.pageValue
    console.log(this.account)
  }
  date = new FormControl(new Date());
  public Editor = ClassicEditor;
  successFlow: successFlow[] = [
    { value: 'support', viewValue: 'Support' },
    { value: 'renewal', viewValue: 'Renewal' },
    { value: 'upsell', viewValue: 'Upsell' },
    { value: 'onboarding', viewValue: 'Onboarding' },
    { value: 'escalation', viewValue: 'Escalation' },
    { value: 'adaption', viewValue: 'Adaption' },
    { value: 'risk', viewValue: 'Risk' }
  ];
  priority: Priority[] = [
    { value: 'low', viewValue: 'Low' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'high', viewValue: 'High' }
  ];
  users: Users[] = [{ "userId": 75, "userName": "dvr007" }, { "userId": 81, "userName": "dvreddytechm" }, { "userId": 58, "userName": "usha12345" }, { "userId": 77, "userName": "testuser007" }, { "userId": 5, "userName": "roruganti" }]

  onFilesAdded() {

  }
  addFiles() {
    this.file.nativeElement.click();
  }
  closeDialog() {
    this.dialogRef.close()
  }
  getSingleUser(user) {
    this.singleUser = user
  }
  onDate(event) {
    const momentDate = new Date(event); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    return formattedDate
  }
  createTask() {
    const formData: FormData = new FormData();
    formData.append('accountId', this.account.accountId);
    formData.append('taskTitle', this.taskTitle)
    formData.append('description', this.htmlContent);
    formData.append('successflow', this.singleSuccessFlow)
    formData.append('assignedTo', this.singleUser.userName);
    formData.append('userId', this.singleUser.userId)
    formData.append('priority', this.priorityValue);
    formData.append('dueDate', this.onDate(this.dueDate))
    formData.append('adminEmail', sessionStorage.getItem('currentUsrEmal'))
    if (this.file.nativeElement.files.length > 0) {
      formData.append('file', this.file.nativeElement.files[0], this.file.nativeElement.files[0].name)
      formData.append('fileName', this.file.nativeElement.files[0].name)
    }
    this.viewService.createTask(formData).subscribe((res) => {
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