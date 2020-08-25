import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './_models'
import { AuthenticationService } from './_services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  currentUser: User;
  adminmodule;
  adminflag: true;
  adminsidebar: false;
  isOpen: true;
  title = 'TechMantraUI';
  constructor(private _router: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}
ngOnInit(){
  this._router.queryParams.subscribe(params => {  
    this.adminsidebar = params['adminmodule'];

    // if(this.adminsidebar === true){
    //   this.adminflag = false;
    // }
    // console.log("this is admin module" + this.adminsidebar);
  })    
}

logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
