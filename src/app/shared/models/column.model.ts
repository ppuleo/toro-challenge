export class ColumnEntity {

  name: string;
  type: string;

  constructor(values: any = {}) {

    // Allow the child class to be idempotent.
    if (values instanceof ColumnEntity) { return values; }

    this.name = values.name || '';
    this.type = values.type || 'STRING';
  }
}
