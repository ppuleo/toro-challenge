import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { Subscription } from 'rxjs';

import { MetricService } from '../shared/services/metric.service';
import { METRIC_COLDEFS } from './metric-columns.const';
import { TableService } from '../shared/services/table.service';

@Component({
  selector: 'toro-metric-manager',
  styleUrls: ['./metric.scss'],
  templateUrl: './metric.component.html'
})
export class MetricComponent implements OnInit, OnDestroy {

  public columnDefs = METRIC_COLDEFS;
  public gridOptions: GridOptions;
  public rowData: any;
  public subscriptions = new Subscription();

  constructor(
    private metricService: MetricService,
    private tableService: TableService
  ){
    this.gridOptions = {
      suppressCellSelection: true
    };
  }

  /**
   * Get all tables.
   */
  getTables = (): void => {
    this.tableService.getTables().subscribe();
  }

  /**
   * Initialize the metrics subscription.
   */
  initMetricsSubscription = (): void => {
    const metricsSubscription = this.metricService.metricsSubject$.subscribe((metrics) => {
      this.rowData = metrics;
    });
    this.subscriptions.add(metricsSubscription);
  }

  /**
   * Initialize the tables subscription.
   */
  initTablesSubscription = (): void => {
    const tableSubscription = this.tableService.tablesSubject$.subscribe((tables) => {
      this.metricService.getMetricsForTables(tables).subscribe();
    });
    this.subscriptions.add(tableSubscription);
  }

  /**
   * Angular OnDestroy lifecycle hook
   * Unsubscribe from all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Angular OnInit lifecycle hook.
   */
  ngOnInit(): void {
    this.getTables();
    this.initTablesSubscription();
    this.initMetricsSubscription();
  }
}

