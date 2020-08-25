
import { BehaviorSubject, Observable, of, pipe, combineLatest, fromEvent} from 'rxjs';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Products } from '../_helpers/product';
import {catchError, finalize} from 'rxjs/operators'
import {OrderService} from '../_services/order.service';
export class ProductsDataSource implements DataSource<Products> {

    private ProductsSubject = new BehaviorSubject<Products[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
  
    public loading$ = this.loadingSubject.asObservable();
  
    constructor(private ordersService: OrderService) {}
  
    connect(collectionViewer: CollectionViewer): Observable<Products[]> {
        return this.ProductsSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void {
        this.ProductsSubject.complete();
        this.loadingSubject.complete();
    }
    loadproducts(oppId, filter='', sortDirection='asc', active, pageIndex = 1, pageSize = 3) {            
        this.loadingSubject.next(true);
        this.ordersService.getProducts(oppId, filter, sortDirection, active, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(products => this.ProductsSubject.next(products));
    }    
  }