import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    public decodedToken;
    public message;
    public error;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    savePwd(data) {
        return this.http.post<any>(environment.apiUrl + '/createPassword', data)
            .pipe(map(usercreatedres => usercreatedres = usercreatedres,
                error => this.error = error)
            );
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        let userData = { "email": username, "password": password };
        let reqHeader = new HttpHeaders({ 'No-Auth': 'True', 'Content-Type': 'text/plain', 'Accept': 'text/html,text/plan, application/json,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,*/*' });
        // return this.http.post<any>(`environment.apiUrl/users/authenticate`, { "data": userData, "headers": reqHeader })
        return this.http.post<any>(environment.apiUrl + '/login', userData)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.decodedToken = jwt_decode(user.token);
                sessionStorage.setItem('userProfile', this.decodedToken.profilename);
                sessionStorage.setItem('loggedInUserName', this.decodedToken.firstName + ' ' + this.decodedToken.lastName);
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                sessionStorage.setItem('token', JSON.stringify(user.token));
                sessionStorage.setItem('currentUsrEmal', this.decodedToken.email);
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }
}