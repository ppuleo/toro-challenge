import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, of, Observable, forkJoin } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { MetricEntity } from '../models/metric.model';
import { TableEntity } from '../models/table.model';
import { UrlService } from './url.service';

@Injectable({ providedIn: 'root' })
export class MetricService {
  private metrics: MetricEntity[];

  metricsSubject$: BehaviorSubject<MetricEntity[]>;

  constructor(
    private http: HttpClient,
    private urlService: UrlService
  ) {
    this.metrics = [];
    this.metricsSubject$ = new BehaviorSubject([]);
  }

  /**
   * Gets the tables for a given database.
   * @param  tableId  A table id to fetch metrics for.
   */
  getMetricsForTable = (tableId: number): Observable<MetricEntity[]> => {
    const metricEntities = [];
    return this.http.get(this.urlService.metricUrl(tableId))
      .pipe(
        map((metrics: any) => {
          metrics.map((metric: any) => {
            metric.tableId = tableId;
            metricEntities.push(new MetricEntity(metric));
            this.metrics = this.metrics.filter((item) => {
              return metric.id !== item.id;
            });
            this.metrics.push(metric);
          });

          this.metricsSubject$.next(this.metrics);
          return metricEntities;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  /**
   * Fetch metrics for an array of tables.
   * @param  tables  An array of table entities to fetch metrics for.
   */
  getMetricsForTables = (tables: TableEntity[]): Observable<MetricEntity[]> => {
    let request;
    const metricEntities = [];
    const requestArray = [];

    tables.forEach((table) => {
      request = this.http.get(this.urlService.metricUrl(table.id));
      requestArray.push(request);
    });

    return forkJoin(requestArray).pipe(
      map((responses: any) => {
        return responses.map((metrics, index) => {
          metrics.map((metric: any) => {
            metric.tableId = tables[index].id;
            metric.tableName = tables[index].name;
            metricEntities.push(new MetricEntity(metric));
            this.metrics = metricEntities;
            this.metrics = this.metrics.filter((item) => {
              return metric.id !== item.id;
            });
          });
        });
      }),
      switchMap(() => {
        this.metricsSubject$.next(this.metrics);
        return of(metricEntities);
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }
}
