import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Users } from '../_helpers/user';

@Injectable({
    providedIn: 'root',
})
export class RoleManagementService {
    private currentUserSubject: BehaviorSubject<any>;
    public _url = environment.apiUrl;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) { }
    public _headers = {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    };

    /* to load all the reports list */
    getRolesHierarchy() {
        return this.http.get<any>(this._url + '/getRolesHierarchy');
    }

    /* to add new roles */
    addRoles(roleObj) {
        return this.http.post<any>(this._url + '/addRole', roleObj);
    }

    /* to edit the roles */
    editRoles(roleObj) {
        return this.http.post<any>(this._url + '/editRole', roleObj);
    }

    /* to delete the roles */
    deleteRoles(roleObj) {
        return this.http.post<any>(this._url + '/deleteRole', roleObj);
    }
}
