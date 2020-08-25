import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-dashboardmodule',
  templateUrl: './dashboardmodule.component.html',
  styleUrls: ['./dashboardmodule.component.css']
})
export class DashboardModuleComponent implements OnInit {
  currentUser: User;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

  ngOnInit() {
    this.router.navigate(['order-list'], { relativeTo: this.route })
  }

}