import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { TableEntity } from '../models/table.model';
import { UrlService } from './url.service';

@Injectable({ providedIn: 'root' })
export class TableService {
  private tables: TableEntity[];

  tablesSubject$: BehaviorSubject<TableEntity[]>;

  constructor(
    private http: HttpClient,
    private urlService: UrlService
  ) {
    this.tables = [];
    this.tablesSubject$ = new BehaviorSubject([]);
  }

  /**
   * Gets the tables for a given database.
   */
  getTables = (): Observable<TableEntity> => {
    const tableEntities = [];
    return this.http.get(this.urlService.tablesUrl())
      .pipe(
        map((tables: any) => {
          tables.map((table: any) => {
            tableEntities.push(new TableEntity(table));
          });

          this.tables = tableEntities;
          this.tablesSubject$.next(this.tables);
          return tableEntities;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }
}
