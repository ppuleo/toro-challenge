import { Component, OnInit } from '@angular/core';
import { GridOptions, RowClickedEvent } from 'ag-grid-community';

import { MetricEntity } from '../shared/models/metric.model';
import { MetricService } from '../shared/services/metric.service';
import { TABLE_COLDEFS } from './table-columns.const';
import { TableService } from '../shared/services/table.service';
import { TableEntity } from '../shared/models/table.model';

@Component({
  selector: 'toro-table-manager',
  styleUrls: ['./table.scss'],
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  public columnDefs = TABLE_COLDEFS;
  public gridOptions: GridOptions;
  public rowData: any;
  public selectedTable: TableEntity;
  public selectedMetrics: MetricEntity[];

  constructor(
    private metricService: MetricService,
    private tableService: TableService
  ){
    this.gridOptions = {
      onRowClicked: this.onRowClicked,
      suppressCellSelection: true
    };
  }

  /**
   * Fetch metrics for a given table entity.
   * @param entity  The table entity to fetch metrics for.
   */
  getTableMetrics = (entity: TableEntity): void => {
    this.metricService.getMetricsForTable(entity.id).subscribe((metrics) => {
      this.selectedMetrics = metrics;
    });
  }

  /**
   * Angular OnInit lifecycle hook.
   */
  ngOnInit(): void {
    this.tableService.getTables().subscribe((tables) => {
      this.rowData = tables;
      this.selectedTable = tables[0];
      this.selectRowById(this.selectedTable, this.gridOptions);
    });
  }

  /**
   * Handles selection of a grid row.
   * @param  rowObj  An ag-Grid row clicked event object.
   */
  onRowClicked = (rowObj: RowClickedEvent): void => {
    if (this.selectedTable && this.selectedTable.id !== rowObj.data.id) {
      this.selectedTable = rowObj.data;
      this.selectRowById(this.selectedTable, this.gridOptions);
    }
  }

  /**
   * Selects an ag-grid row by entity unique ID.
   * @param  entity       A selected entity details.
   * @param  gridOptions  An ag-grid gridOptions object.
   */
  selectRowById = (entity: TableEntity, gridOptions: GridOptions): void => {
    const model = gridOptions.api.getModel();
    let node;
    let rowIndex = 0;

    setTimeout(() => {
      gridOptions.api.forEachNodeAfterFilterAndSort((row, index) => {
        if (entity && row.data.id === entity.id) { rowIndex = index; }
        return;
      });

      node = model.getRow(rowIndex);
      node.setSelected(true, true);
      this.getTableMetrics(entity);
    });
  }
}
