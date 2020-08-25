import { BehaviorSubject, Observable, of, pipe, combineLatest, fromEvent} from 'rxjs';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { OrderItem } from '../_helpers/orderitem';
import {catchError, finalize, filter, debounceTime, distinctUntilChanged, tap, merge} from 'rxjs/operators'
import {OrderService} from '../_services/order.service';
export class OrderItemsDataSource implements DataSource<OrderItem> {

    private ordersSubject = new BehaviorSubject<OrderItem[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
  
    public orderitemloading$ = this.loadingSubject.asObservable();
  
    constructor(private ordersService: OrderService) {}
  
    connect(collectionViewer: CollectionViewer): Observable<OrderItem[]> {
        return this.ordersSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void {
        this.ordersSubject.complete();
        this.loadingSubject.complete();
    }
    loadorderitems(id, filter='', sortDirection='asc', active, pageIndex = 1, pageSize = 3) {      
        this.loadingSubject.next(true);
        this.ordersService.getOrderItem(id, filter, sortDirection, active, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(orders => this.ordersSubject.next(orders));
    }    
  }