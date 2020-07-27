import { Entity } from './entity.model';

export class MetricEntity extends Entity {

  column: string;
  currentValue: number;
  tableId: number;
  tableName: string;

  constructor(values: any = {}) {

    super(values);

    if (values instanceof MetricEntity) { return values; }

    this.column = String(values.column);
    this.currentValue = Number(values.currentValue) || 0;
    this.name = String(values.metric);
    this.tableId = Number(values.tableId) || -1;
    this.tableName = String(values.tableName);
  }
}
