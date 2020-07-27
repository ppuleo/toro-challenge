export abstract class Entity {

  name: string;
  readonly id: number;

  constructor(values: any = {}) {
    this.name = String(values.name);
    this.id = Number(values.id) || 0;
  }
}
