import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { ActivatedRoute } from '@angular/router';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'app-createpwd',
  templateUrl: './createpwd.component.html',
  styleUrls: ['./createpwd.component.less'],
})
export class CreatePwdComponent implements OnInit {
  createPwdForm: FormGroup;
  loading = false;
  enableloginbtn = false;
  matcher = new MyErrorStateMatcher();
  public email;
  public resmessage: string;
  constructor(private _router: ActivatedRoute, private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {


  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmpassword.value;


    return pass === confirmPass ? null : { notSame: true }
  }
  ngOnInit() {
    this._router.queryParams.subscribe(params => {
      console.log(params.username)
      this.email = params.username;
    })
    this.createPwdForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmpassword: [''],
      email: this.email,
    }, { validator: this.checkPasswords });
  }
  onSubmit() {
    this.authenticationService.savePwd(this.createPwdForm.value).subscribe(
      response => { this.resmessage = response; this.enableloginbtn = true; },
      error => error = error
    )
  }
}


