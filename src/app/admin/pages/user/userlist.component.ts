import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../../../_services/order.service'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from '../../../_helpers/user';
import { UserDataSource } from '../../../datasources/usersdatasource';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators'
import { combineLatest, fromEvent } from 'rxjs';
import { User } from 'src/app/_models';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NewprofileFormdialogComponent } from '../../newprofile-formdialog/newprofile-formdialog.component';
import { FormdialogComponent } from '../../newuser-formdialog/formdialog.component';
import { CommonService } from 'src/app/_services/common.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
export interface ImportedUser {
  selection: boolean;
  userId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  reportingManager: string;
}
const ELEMENT_DATA: ImportedUser[] = [];
@Component({
  selector: 'app-users',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements AfterViewInit, OnInit {
  value = '';
  user: Users;
  displayedColumns: string[] = ['username', 'email', 'name', 'reportingManager', 'role', 'actions'];
  dataSource: UserDataSource;
  public errorMessage;
  public error;
  public importedUserList = false;
  public spinner = false;
  public dataLength;
  public resData: any[];
  userForm: FormGroup;

  displayedColumnsselectUsrs: string[] = ['select', 'userId', 'email', 'name', 'reportingManager', 'status'];
  dataSourceselectUsrs = new MatTableDataSource();
  selection = new SelectionModel<ImportedUser>(true, []);

  successMsg;
  success = false;
  public tableBg = {
    background: "#fff",
    padding: "15px",
    border: "1px solid #ccc"
  }

  importUser(Import, user) {
    this.spinner = true;
    this._commonService.getImportUsersList().subscribe((res) => {
      if (res.length > 0) {
        this.dataSourceselectUsrs = res;
        this.resData = res;
        this.dataLength = res.length;
        this.importedUserList = true;
      }
      this.spinner = false;
      console.log(JSON.stringify(this.dataSourceselectUsrs))
    },
      (error) => (this.error = error));
  }

  // import selected users
  importSelectedUsrs() {

    let selectedUsrs = [];
    selectedUsrs.push(this.selection);
    console.log(JSON.stringify(selectedUsrs[0]._selected));
    this.spinner = true;
    let data = {
      adminEmail: sessionStorage.getItem('currentUsrEmal'),
      usersSelected: selectedUsrs[0]._selected,
    }
    this._commonService.importSelectedUsrs(data).subscribe((res) => {
      if (res.length > 0) {
        console.log(res);
      }
      this.spinner = false;
    },
      (error) => (this.error = error));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataLength;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.resData.forEach(row => { console.log(JSON.stringify(row)); this.selection.select(row) });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ImportedUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.userId + 1}`;
  }

  constructor(public fb: FormBuilder, private _router: ActivatedRoute, private route: Router, private _commonService: CommonService, private cdr: ChangeDetectorRef, private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('userinput') userinput: ElementRef;
  @ViewChild('resmessage') resmessage: string;
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(FormdialogComponent, {
      width: '125rem',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Create') {
        this.addUserData(result.data);
      } else if (result.event === 'Update') {
        this.updateUserData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteUserData(result.data);
      }
    });
  }

  ngOnInit() {
    this.user = this._router.snapshot.data["user"];
    this.dataSource = new UserDataSource(this._commonService);
    this.dataSource.loadusers('', 'asc', '', 1, 5);
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.userinput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 1;
          this.loadUsersPage();
        })
      ).subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 1);

    // on sort or paginate events, load a new page
    combineLatest(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadUsersPage()))
      .subscribe();
    this.paginator.page.pipe(tap(() => this.loadUsersPage())).subscribe();
  }

  loadUsersPage() {
    this.dataSource.loadusers(this.userinput.nativeElement.value, this.sort.direction, this.sort.active, this.paginator.pageIndex, this.paginator.pageSize);
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };

  onCreateUser(action, obj) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(FormdialogComponent, dialogConfig)
  }

  onEditUser(action, obj) {
    obj.action = action
    const dialogRef = this.dialog.open(FormdialogComponent, {
      data: obj
    });


    console.log(JSON.stringify(obj));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data = obj;
    this.dialog.open(FormdialogComponent, dialogConfig)
  }
  onRemoveUser(userId) {
    this._commonService.deleteUser({ userId }).subscribe((dt: any) => {
      console.log(dt)
      this.successMsg = dt.message;
      this.success = true;
      this.loadUsersPage()
    })
  }
  addUserData(userObj) {
  }
  updateUserData(user) {

  }
  deleteUserData(user) {

  }

}