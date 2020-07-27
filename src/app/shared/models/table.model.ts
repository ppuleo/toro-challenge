import { ColumnEntity } from './column.model';
import { Entity } from './entity.model';

export class TableEntity extends Entity {

  columns: ColumnEntity[];
  schema: string;

  constructor(values: any = {}) {

    super(values);

    // Allow the child class to be idempotent.
    if (values instanceof TableEntity) { return values; }

    this.columns = this.populateColumns(values.columns);
    this.name = String(values.table);
    this.schema = String(values.schema);
  }

  /**
   * Safely populate the column array.
   * @param  columns  An array of column-like objects to populate with.
   */
  protected populateColumns = (columns: any) => {
    if (Array.isArray(columns)) {
      return columns.map((column) => {
        return new ColumnEntity(column);
      });
    }
    return [];
  }
}
