import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../_helpers/order';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Opportunity } from '../_helpers/opportunity';
import { Products } from '../_helpers/product';
import { Account } from '../_helpers/account';
import { Users } from '../_helpers/user';
import { Profiles } from '../_helpers/profiles';
import { Usage } from '../_helpers/usage';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private currentUserSubject: BehaviorSubject<any>;
  public _url = environment.apiUrl;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) { }
  public _headers = {
    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
  };

  getOrders(viewName,
    filter = '',
    sortOrder = 'asc',
    active = '',
    pageNumber = 1,
    pageSize = 3
  ): Observable<Orders[]> {
    return this.http
      .post(this._url + '/getDashboardData', {
        filter: filter,
        sortOrder: sortOrder,
        sortBy: active,
        pageNumber: pageNumber,
        pageSize: pageSize,
      })
      .pipe(
        map((res) => {
          res = res;
          // console.log(JSON.stringify(res['pageOptions']));
          return res['queryResult'];
        })
      );
  }

  getOrdersCount(
    filter = '',
    sortOrder = 'asc',
    active = '',
    pageNumber = 1,
    pageSize = 3
  ) {
    return this.http
      .post(this._url + '/getDashboardData', {
        filter: filter,
        sortOrder: sortOrder,
        sortBy: active,
        pageNumber: pageNumber,
        pageSize: pageSize,
      })
      .pipe(
        map((res) => {
          res = res;
          // console.log(JSON.stringify(res['pageOptions']));
          return res['pageOptions'];
        })
      );
  }

  getOrderItem(id, filter, sortOrder, active, pageNumber, pageSize) {
    return this.http
      .post(this._url + '/getOrderItems', {
        orderId: id,
        filter: filter,
        sortOrder: sortOrder,
        sortBy: active,
        pageNumber: pageNumber,
        pageSize: pageSize,
      })
      .pipe(
        map((res) => {
          res = res;
          //console.log(JSON.stringify(res));
          return res['queryResult'];
        })
      );
  }

  getOppurtunity(
    filter = '',
    sortOrder = 'asc',
    active,
    pageNumber = 1,
    pageSize = 3
  ): Observable<Opportunity[]> {
    return this.http
      .post(this._url + '/getOpportunities', {
        filter: filter,
        sortOrder: sortOrder,
        sortBy: active,
        pageNumber: pageNumber,
        pageSize: pageSize,
      })
      .pipe(
        map((res) => {
          res = res;
          // console.log(JSON.stringify(res));
          return res['queryResult'];
        })
      );
  }
  getAllOppurtunity(viewname,
    filter = '',
    sortOrder = 'asc',
    active,
    pageNumber = 1,
    pageSize = 3
  ): Observable<Opportunity[]> {
    return this.http
      .post(this._url + '/getOpportunities', {
        viewName: viewname,
        filter: filter,
        sortOrder: sortOrder,
        sortBy: active,
        pageNumber: pageNumber,
        pageSize: pageSize,
      })
      .pipe(
        map((res) => {
          res = res;
          // console.log(JSON.stringify(res['queryResult'][1]));
          return res['queryResult'];
        })
      );
  }

  getAllAccounts(
    viewname,
    filter = '',
    sortOrder = 'asc',
    active,
    pageNumber,
    pageSize
  ): Observable<Account[]> {
    return this.http
      .post(this._url + '/getAccounts', {
        viewName: viewname,
        filter: filter,
        sortOrder: sortOrder,
        sortBy: active,
        pageNumber: pageNumber,
        pageSize: pageSize,
      })
      .pipe(
        map((res) => {
          res = res;
          // console.log(JSON.stringify(res['queryResult'][1]));
          return res['queryResult'];
        })
      );
  }

  getAllAccountsView(data) {
    return this.http.post<any>(this._url + '/getAccounts', data);
  }

  getAllOpportunitiesView(data) {
    return this.http.post<any>(this._url + '/getOpportunities', data);
  }

  getAllOrdersView(data) {
    return this.http.post<any>(this._url + '/getDashboardData', data);
  }

  getAccount(
    filter = '',
    sortOrder = 'asc',
    active,
    pageNumber,
    pageSize
  ): Observable<Account[]> {
    return this.http
      .post(this._url + '/getAccounts', {
        filter: filter,
        sortOrder: sortOrder,
        sortBy: active,
        pageNumber: pageNumber,
        pageSize: pageSize,
      })
      .pipe(
        map((res) => {
          res = res;
          // console.log(JSON.stringify(res['queryResult'][1]));
          return res['queryResult'];
        })
      );
  }

  getProducts(
    oppId,
    filter = '',
    sortOrder = 'asc',
    active,
    pageNumber,
    pageSize
  ): Observable<Products[]> {
    return this.http
      .post(this._url + '/getOpportunityProducts', {
        opportunityId: oppId,
        filter: '',
        sortOrder: sortOrder,
        sortBy: active,
        pageNumber: pageNumber,
        pageSize: pageSize,
      })
      .pipe(
        map((res) => {
          res = res;
          // console.log(JSON.stringify(res['queryResult'][1]));
          return res['queryResult'];
        })
      );
  }

  getOrderUsage(orderId) {
    return this.http
      .post<any>(this._url + '/getUsageProductData', {
        orderId: orderId,
      })
  }

  getCases(accountId) {
    return this.http
      .post<any>(this._url + '/getTicketDetails', {
        accountId: accountId,
      })
  }
}
