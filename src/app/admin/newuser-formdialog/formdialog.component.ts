import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../_services/common.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from 'src/app/_helpers/user';

@Component({
  selector: 'app-formdialog',
  templateUrl: './formdialog.component.html',
  styleUrls: ['./formdialog.component.css'],
})
export class FormdialogComponent implements OnInit {
  submitted: boolean = false;
  profiles: any;
  managers: any;
  roles: any;
  error: string;
  userForm: FormGroup;
  constructor(
    private router: Router,
    public fb: FormBuilder,
    private http: HttpClient,
    private userService: CommonService,
    public dialogref: MatDialogRef<FormdialogComponent>
  ) { }

  onClear() {
    this.userForm.reset();
  }
  @Output() resmessage: string;
  onSubmitUsrForm() {
    //alert(JSON.stringify(this.userForm.value))
    this.submitted = true;
    this.userService.saveUsers(this.userForm.value).subscribe(
      (response) => (this.resmessage = response),
      (error) => (error = error)
    );
    this.onClose();
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };

  onClose() {
    this.userForm.reset();
    this.router.navigate['admin/userlist'];
    this.dialogref.close();
  }
  ngOnInit() {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      profileId: ['', [Validators.required]],
      reportingManager: ['', [Validators.required]],
      adminEmail: sessionStorage.getItem('currentUsrEmal'),
      companyName: [''],
      dept: [''],
      isActive: [],
      role: [''],
      profileName: [''],
    });

    this.userService.getProfiles().subscribe(
      (response) => (this.profiles = response),
      (error) => (this.error = error)
    );
    this.userService.getManagers().subscribe(
      (response) => (this.managers = response),
      (error) => (this.error = error)
    );
    this.userService.getRoles().subscribe(
      (response) => (this.roles = response),
      (error) => (this.error = error)
    );
  }
}
