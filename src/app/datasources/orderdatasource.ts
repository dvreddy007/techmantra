
import { BehaviorSubject, Observable, of, pipe, combineLatest, fromEvent } from 'rxjs';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Orders } from '../_helpers/order';
import { catchError, finalize } from 'rxjs/operators'
import { OrderService } from '../_services/order.service';
export class OrdersDataSource implements DataSource<Orders> {

    private ordersSubject = new BehaviorSubject<Orders[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private ordersService: OrderService) { }

    connect(collectionViewer: CollectionViewer): Observable<Orders[]> {
        return this.ordersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.ordersSubject.complete();
        this.loadingSubject.complete();
    }
    loadorders(viewName, filter = '', sortDirection = 'asc', active, pageIndex, pageSize) {
        this.loadingSubject.next(true);
        this.ordersService.getOrders(viewName, filter, sortDirection, active, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(orders => this.ordersSubject.next(orders));
    }
}