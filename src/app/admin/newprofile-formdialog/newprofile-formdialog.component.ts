import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'
import { CommonService } from 'src/app/_services/common.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newprofile-formdialog',
  templateUrl: './newprofile-formdialog.component.html',
  styleUrls: ['./newprofile-formdialog.component.css']
})
export class NewprofileFormdialogComponent implements OnInit {
  profileForm: FormGroup;
  permissionsForm: FormGroup;
  public profilePermissions;
  public tablePermissions: any[];
  public submitted: boolean = false;
  public isLinear: boolean = true;
  public loading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private profileService: CommonService, private fb: FormBuilder, public dialogref: MatDialogRef<NewprofileFormdialogComponent>) { }
  ngOnInit() {
    this.profileForm = this.fb.group({
      profileName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    })
  }

  loadProfilePermissions() {
    this.loading = true;
    this.profileService.saveProfile(this.profileForm.value).subscribe(
      response => {
        this.profilePermissions = response;
        this.loading = false;
      },
      error => error = error
    )
    //console.log(JSON.stringify(this.profilePermissions));
  }
  onClear() {
    this.profileForm.reset();
  }

  onSave() {
    if (this.profileForm.valid) {
      this.profileForm.reset();
      this.dialogref.close()
    }
  }

  onClose() {
    this.profileForm.reset();
    this.dialogref.close()
  }


  getResult() {
    this.profileService.updateProfile(this.profilePermissions.filter(permission => permission.checked)).subscribe(
      response => response = response,
      error => error = error
    )
    this.onClose();
    this.router.navigate['admin/userlist'];
  }
}