export class Todo {
  id: number;
  title = '';
  complete = false;
  timeSpent: number = 1800;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
