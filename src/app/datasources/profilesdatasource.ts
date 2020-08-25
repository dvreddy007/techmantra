
import { BehaviorSubject, Observable, of, pipe, combineLatest, fromEvent} from 'rxjs';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Profiles } from '../_helpers/profiles';
import {catchError, finalize} from 'rxjs/operators'
import { CommonService } from '../_services/common.service';
export class ProfilesDataSource implements DataSource<Profiles> {

    private profilesSubject = new BehaviorSubject<Profiles[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
  
    public loading$ = this.loadingSubject.asObservable();
  
    constructor(private profilesService: CommonService) {}
  
    connect(collectionViewer: CollectionViewer): Observable<Profiles[]> {
        return this.profilesSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void {
        this.profilesSubject.complete();
        this.loadingSubject.complete();
    }
    loadprofiles() {            
        this.loadingSubject.next(true);
        this.profilesService.getProfiles().pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(profiles => this.profilesSubject.next(profiles));
    }    
  }