
import { OrderService } from '../_services/order.service';
import { BehaviorSubject, Observable, of, pipe, combineLatest, fromEvent } from 'rxjs';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Opportunity } from '../_helpers/opportunity';
import { catchError, finalize } from 'rxjs/operators'
export class OpportunityDataSource implements DataSource<Opportunity> {

    private opportunitySubject = new BehaviorSubject<Opportunity[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private ordersService: OrderService) { }

    connect(collectionViewer: CollectionViewer): Observable<Opportunity[]> {
        return this.opportunitySubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.opportunitySubject.complete();
        this.loadingSubject.complete();
    }
    loadopportunities(filter = '', sortDirection = 'asc', active, pageIndex, pageSize) {
        this.loadingSubject.next(true);
        this.ordersService.getOppurtunity(filter, sortDirection, active, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(opportunities => this.opportunitySubject.next(opportunities));
    }
    loadallopportunities(viewName, filter = '', sortDirection = 'asc', active, pageIndex, pageSize) {
        this.loadingSubject.next(true);
        this.ordersService.getAllOppurtunity(viewName, filter, sortDirection, active, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(opportunities => this.opportunitySubject.next(opportunities));
    }
}