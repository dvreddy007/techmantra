import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import {OrderService} from '../../../_services/order.service'
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Router, ActivatedRoute} from '@angular/router';
import { Profiles } from '../../../_helpers/profiles';
import {ProfilesDataSource} from '../../../datasources/profilesdatasource';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators'
import { combineLatest, fromEvent} from 'rxjs';
import { User } from 'src/app/_models';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NewprofileFormdialogComponent } from '../../newprofile-formdialog/newprofile-formdialog.component';
import { FormdialogComponent } from '../../newuser-formdialog/formdialog.component';
import { CommonService } from 'src/app/_services/common.service';
@Component({
  selector: 'app-profiles',
  templateUrl: './profilelist.component.html',
  styleUrls: ['./profilelist.component.css']
})
export class ProfileListComponent implements AfterViewInit, OnInit {
  value = '';
  profile: Profiles;
  displayedColumns: string[] = ['profilename','actions'];
  dataSource: ProfilesDataSource; 
  public errorMessage;
  success = false;
  successMsg;
  public tableBg = { 
    background: "#fff",
    padding: "15px",
    border: "1px solid #ccc"
  }  
  constructor(private _router: ActivatedRoute, private route:Router, private profileService: CommonService, private cdr: ChangeDetectorRef, private dialog: MatDialog) { }
    
//   @ViewChild(MatPaginator) paginator: MatPaginator;
//   @ViewChild(MatSort) sort: MatSort;
     @ViewChild('profileinput') profileinput: ElementRef;

  ngOnInit() {    
        this.profile = this._router.snapshot.data["user"];
        this.dataSource = new ProfilesDataSource(this.profileService);
        this.dataSource.loadprofiles();  
  }

  loadUsersPage() {    
    this.dataSource.loadprofiles();
}


  ngAfterViewInit() {
    // server-side search
    fromEvent(this.profileinput.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {                    
                    this.loadUsersPage();
                })
            ).subscribe();
  }
  onRemoveProfile(profileId){
    this.profileService.deleteProfile({profileId}).subscribe((dt:any)=>{
      console.log(dt)
      this.successMsg = dt.message;
      this.success = true;
      this.loadUsersPage()
    })
  }

      onEditUser(action, obj){
        obj.action = action
        const dialogRef = this.dialog.open(FormdialogComponent, {
            data: obj
        });
        // dialogRef.afterClosed().subscribe(result => {
        //     if(result.event === 'Add'){
        //         this.addRowData(result.data);
        //     }else if(result.event === 'Update'){
        //         this.upDateRowData(result.data);
        //     }else if(result.event === 'Delete'){
        //         this.deleteRowData(result.data);
        //     }
        // });

        console.log(JSON.stringify(obj));
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "50%";
        dialogConfig.data = obj;
        this.dialog.open(FormdialogComponent,dialogConfig)      
      }
      onCreateProfile(){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = "50%"
        this.dialog.open(NewprofileFormdialogComponent,dialogConfig)
    }
}