import { BehaviorSubject, Observable, of, pipe, combineLatest, fromEvent} from 'rxjs';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Users } from '../_helpers/user';
import {catchError, finalize} from 'rxjs/operators'
import {CommonService} from '../_services/common.service';
export class UserDataSource implements DataSource<Users> {

    private usersSubject = new BehaviorSubject<Users[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
  
    public loading$ = this.loadingSubject.asObservable();
  
    constructor(private usersService: CommonService) {}
  
    connect(collectionViewer: CollectionViewer): Observable<Users[]> {
        return this.usersSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void {
        this.usersSubject.complete();
        this.loadingSubject.complete();
    }
    loadusers(filter='', sortDirection='asc', active, pageIndex, pageSize) {            
        this.loadingSubject.next(true);
        this.usersService.getUsers(filter, sortDirection, active, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(users => this.usersSubject.next(users));
    }    
  }