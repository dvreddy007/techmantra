import {
    BehaviorSubject,
    Observable,
    of,
    pipe,
    combineLatest,
    fromEvent,
} from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Report } from '../_helpers/report';
import { catchError, finalize } from 'rxjs/operators';
import { CommonService } from '../_services/common.service';
export class ReportGenDataSource implements DataSource<Report> {
    private reportSubject = new BehaviorSubject<Report[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private reportService: CommonService) { }

    connect(collectionViewer: CollectionViewer): Observable<Report[]> {
        return this.reportSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.reportSubject.complete();
        this.loadingSubject.complete();
    }
    loaddata(data) {
        this.loadingSubject.next(true);
        this.reportService.generateReport(data)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((reportcols) => this.reportSubject.next(reportcols));
    }
}
