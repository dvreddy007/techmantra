import { from } from 'rxjs';
import { Component, Inject, OnInit, Optional } from '@angular/core'
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
interface Food {
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
  account;
  constructor(public dialogRef: MatDialogRef<TouchPointComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.account = data.pageValue
    console.log(this.account)

  }
  date = new FormControl(new Date());

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Support' },
    { value: 'pizza-1', viewValue: 'Renewal' },
    { value: 'tacos-2', viewValue: 'Upsell' },
    { value: 'tacos-2', viewValue: 'Onboarding' },
    { value: 'tacos-2', viewValue: 'Escalation' },
    { value: 'tacos-2', viewValue: 'Adaption' },
    { value: 'tacos-2', viewValue: 'Risk' }
  ];

  touchType: touch[] = [
    { value: '0', viewValue: 'Web meeting' },
    { value: '1', viewValue: ' Kick-Off meeting' },
    { value: '3', viewValue: 'Internal meating' },

  ];
  addFiles() {

  }
  closeDialog() {
    this.dialogRef.close()
  }
  ngOnInit() {

  }
}