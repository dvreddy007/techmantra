import {
  BehaviorSubject,
  Observable,
  of,
  pipe,
  combineLatest,
  fromEvent,
} from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Account } from '../_helpers/account';
import { catchError, finalize } from 'rxjs/operators';
import { OrderService } from '../_services/order.service';
export class AccountDataSource implements DataSource<Account> {
  private accountSubject = new BehaviorSubject<Account[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private accountService: OrderService) { }

  connect(collectionViewer: CollectionViewer): Observable<Account[]> {
    return this.accountSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.accountSubject.complete();
    this.loadingSubject.complete();
  }
  loadaccounts(viewname, filter, sortDirection, active, pageIndex, pageSize) {
    this.loadingSubject.next(true);
    this.accountService.getAllAccounts(viewname, filter, sortDirection, active, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((accounts) => this.accountSubject.next(accounts));
  }
}
