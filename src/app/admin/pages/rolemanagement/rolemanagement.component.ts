import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { RoleManagementService } from '../../../_services/rolemanagement.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { from, Observable, of as observableOf } from 'rxjs';

interface RoleNode {
  value: string;
  children?: RoleNode[];
  parentId: string;
  id: string;
}

interface FlatRoleNode {
  expandable: boolean;
  value: string;
  level: number;
  parentId: string;
  id: string;
}
export interface DialogData {
  roleName: string;
  parentId: string;
  roleId: string;
  id: string;
}
@Component({
  selector: 'app-rolemanagement',
  templateUrl: './rolemanagement.component.html',
  styleUrls: ['./rolemanagement.component.css']
})
export class RolemanagementComponent implements OnInit {
  public error;
  public successMesg;
  public spinner = false;
  dialogValue: any[];
  private _transformer = (node: RoleNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      value: node.value,
      level: level,
      parentId: node.parentId,
      id: node.id,
    };
  }
  private _getChildren = (node: RoleNode): Observable<RoleNode[]> => {
    return observableOf(node.children);
  }

  treeControl = new FlatTreeControl<FlatRoleNode>(node => node.level, node => node.expandable = true);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, this._getChildren);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(public dialog: MatDialog, private rolemgmtService: RoleManagementService) {

  }

  hasChild = (_: number, node: FlatRoleNode) => node.expandable;
  @ViewChild('tree') tree;

  loadRoleHirarchy() {
    this.spinner = true;
    this.rolemgmtService.getRolesHierarchy().subscribe((res) => {
      const TREE_DATA: RoleNode[] = [res];
      this.dataSource.data = TREE_DATA;
      this.tree.treeControl.expandAll();
      this.spinner = false;
    },
      (error) => (this.error = error))
  }
  ngOnInit() {
    this.loadRoleHirarchy();
    // this.tree.treeControl.expandAll();
  }
  // @ViewChild('tree') tree;
  // ngAfterViewInit() {
  //   this.tree.treeControl.expandAll();
  // }
  // addRole(roleObj) {
  //   const dialogRef = this.dialog.open(AddRoleComponent, {
  //     width: '35%',
  //     backdropClass: 'custom-dialog-backdrop-class',
  //     panelClass: 'custom-dialog-panel-class',
  //     data: { pageValue: roleObj }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.dialogValue = result.data;
  //   });
  // }

  // editRole(roleObj) {
  //   this.dataSource= roleObj
  //   this.rolemgmtService.editRoles(this.dataSource).subscribe(res=>{
  //     console.log(res)
  //     this.successMesg = res.message;
  //   })
  //   this.loadRoleHirarchy();
  //     }

  deleteRole() {

  }
  assignRole() {

  }

  saveRoleDialog(roleObj): void {
    let roleName = '';
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '45rem',
      height: '10rem',
      data: { roleId: roleObj.parentId, roleName: roleName }
    });
    dialogRef.afterClosed().subscribe(roleObj => {
      console.log(JSON.stringify(roleObj));
      //roleObj = { parentId: roleObj.parentId, roleName: roleObj.roleName };

      this.rolemgmtService.addRoles(roleObj).subscribe((response) => {
        console.log('role added successfully' + JSON.stringify(response));
        this.loadRoleHirarchy();
        this.successMesg = response.message;
      },
        (error) => (this.error = error)
      );
    });
  }

  editRoleDialog(roleObj): void {
    console.log(JSON.stringify(roleObj));
    const dialogRef = this.dialog.open(EditRoleComponent, {
      width: '45rem',
      height: '10rem',
      data: { id: roleObj.id, roleName: roleObj.value }
    });
    dialogRef.afterClosed().subscribe(roleObj => {
      console.log(JSON.stringify(roleObj));
      roleObj = { roleId: roleObj.id, roleName: roleObj.roleName };

      this.rolemgmtService.editRoles(roleObj).subscribe((response) => {
        console.log('role modified successfully' + JSON.stringify(response));
        this.loadRoleHirarchy();
        this.successMesg = response.message;

      },
        (error) => (this.error = error)
      );
    });
  }

  deleteRoleDialog(roleObj): void {
    console.log(JSON.stringify(roleObj));
    const dialogRef = this.dialog.open(DeleteRoleComponent, {
      width: '45rem',
      height: '10rem',
      data: { id: roleObj.id, roleName: roleObj.value }
    });
    dialogRef.afterClosed().subscribe(roleObj => {
      console.log(JSON.stringify(roleObj));
      roleObj = { roleId: roleObj.id, roleName: roleObj.roleName};

      this.rolemgmtService.deleteRoles(roleObj).subscribe((response) => {
        console.log('role deleted successfully' + JSON.stringify(response));
        this.loadRoleHirarchy();
        this.successMesg = response.message;
      },
        (error) => (this.error = error)
      );
    });
  }


}
@Component({
  selector: 'addroledialog',
  templateUrl: 'addrole.component.html',
})
export class AddRoleComponent {
  constructor(
    public dialogRef: MatDialogRef<AddRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { console.log(JSON.stringify(data)) }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'editroledialog',
  templateUrl: 'editrole.component.html',
})
export class EditRoleComponent {
  constructor(
    public dialogRef: MatDialogRef<EditRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,public rolemanService:RoleManagementService) { console.log(JSON.stringify(data)) }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}

@Component({
  selector: 'deleteroledialog',
  templateUrl: 'deleterole.component.html',
})
export class DeleteRoleComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ,public rolemanService:RoleManagementService) { console.log(JSON.stringify(data)) }

  onNoClick(): void {
    this.dialogRef.close();
  }
  

}
