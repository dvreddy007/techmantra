import { from } from 'rxjs';
import { Component, Inject, OnInit, Optional } from '@angular/core'
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  account;
  constructor(public dialogRef: MatDialogRef<AddTaskComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.account = data.pageValue
    console.log(this.account)

  }
  date = new FormControl(new Date());
  public Editor = ClassicEditor;
  foods: Food[] = [
    { value: 'support', viewValue: 'Support' },
    { value: 'renewal', viewValue: 'Renewal' },
    { value: 'upsell', viewValue: 'Upsell' },
    { value: 'onboarding', viewValue: 'Onboarding' },
    { value: 'escalation', viewValue: 'Escalation' },
    { value: 'adaption', viewValue: 'Adaption' },
    { value: 'risk', viewValue: 'Risk' }
  ];
  addFiles() {

  }
  closeDialog() {
    this.dialogRef.close()
  }
  ngOnInit() {

  }
}