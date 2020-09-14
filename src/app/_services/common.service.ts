import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Users } from '../_helpers/user';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private currentUserSubject: BehaviorSubject<any>;
  public _url = environment.apiUrl;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) { }
  public _headers = {
    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
  };

  // to fetch users list
  getUsers(
    filter = '',
    sortOrder = 'asc',
    active = '',
    pageNumber = 1,
    pageSize = 3
  ): Observable<Users[]> {
    return this.http
      .post(this._url + '/getUsers', {
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

  saveUsers(userdata) {
    return this.http.post<any>(this._url + '/addUser', userdata);
  }

  // to import all users 
  getImportUsersList() {
    return this.http.get<any>(this._url + '/getImportUsersList');
  }

  // importSelected users method
  importSelectedUsrs(selectedusrs) {
    return this.http.post<any>(this._url + '/importUser', selectedusrs);
  }

  /* to save profile */
  saveProfile(profiledata) {
    return this.http.post<any>(this._url + '/createProfile', profiledata);
  }

  /* to update profile permissions */
  updateProfile(profiledata) {
    return this.http.post<any>(
      this._url + '/updateProfilePermissions',
      profiledata
    );
  }

  /* to load the existing profiles and bind to the profile picklist */
  getProfiles() {
    return this.http.get<any>(this._url + '/getProfiles');
  }

  /* to load the existing mangers list and bind to the manager picklist */
  getManagers() {
    return this.http.get<any>(this._url + '/getManagers');
  }

  /* to load the existing roles list and bind to the role picklist */
  getRoles() {
    return this.http.get<any>(this._url + '/getRoles');
  }

  /*dashboard data calls */
  getBarChartData() {
    return this.http.get(this._url + '/getBarChartData');
  }

  getIndustryPieData() {
    return this.http.get(this._url + '/getIndustryPieChart');
  }

  // the dashboard widget data retrival api's
  getWonOpportunities() {
    return this.http.get(this._url + '/getWonOpportunitiesChart');
  }

  getClosingOpportunities() {
    return this.http.get(this._url + '/getClosingOpportunitiesChart');
  }

  getPipelinedOpportunities() {
    return this.http.get(this._url + '/getPipelinedOpportunitiesChart');
  }

  getLostOpportunities() {
    return this.http.get(this._url + '/getLostOpportunitiesChart');
  }

  getViewList() {
    return this.http.get(this._url + '/getViewList');
  }

  // to get selected table list for reports
  getReportTableList(selectedTable) {
    console.log(selectedTable);
    if (selectedTable !== "" || selectedTable !== null) {
      return this.http.post<any>(this._url + '/getReportGenerationTableList', { "tableSelected": selectedTable });
    } else {
      return this.http.post<any>(this._url + '/getReportGenerationTableList', {});
    }

  }

  // to get Table list of available tables
  getTableList() {
    return this.http.get<any>(this._url + '/getTableList');
  }

  editReport(reportId) {
    return this.http.post<any>(this._url + '/editReport', { reportId: reportId });
  }

  // to get Date columns for all tables
  getDateColumns() {
    return this.http.post<any>(this._url + '/getDateColumns', {});
  }

  // to get selected table column list
  getTableColumnsViewMgmt(tablename) {
    console.log(tablename)
    return this.http.post<any>(this._url + '/getColumnList', { tablename: tablename });
  }

  // to get selected table column list
  getTableColumnsList(tablename) {
    console.log(tablename)
    return this.http.post<any>(this._url + '/getColumnList', { tablename: tablename });
  }

  // to get selected table column list
  getTableColumns(selectedTableObj) {
    return this.http.post<any>(this._url + '/getReportGenerationColumnList', { tableName: selectedTableObj.table_name, relationKey: selectedTableObj.relationColumn });
  }

  // to get selected table column list
  getSelectedTableColumns(viewname) {
    return this.http.post<any>(this._url + '/getSelectedColumns', {
      viewname: viewname,
    });
  }

  // to generate report for the filters data selected
  generateReport(datatoSubmit) {
    return this.http.post<any>(this._url + '/createReport', datatoSubmit);
  }

  updateColumns(data) {
    return this.http.post<any>(this._url + '/updateColumns', data);
  }

  deleteUser(data) {
    return this.http.post<any>(this._url + '/deleteUser', data)
  }

  deleteProfile(data) {
    return this.http.post<any>(this._url + '/deleteProfile', data)

  }

  userSave(data) {
    return this.http.post<any>(this._url + '/getUsers', data)
  }

  /* to load all the reports list */
  getReports() {
    return this.http.get<any>(this._url + '/getReports');
  }

  /* to load the report of the report */
  getReport(query) {
    return this.http.post<any>(this._url + '/getReportResult', { "reportQuery": query });
  }
}
