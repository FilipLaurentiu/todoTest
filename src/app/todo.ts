export class Todo {
  id: number;
  title = '';
  complete = false;
  timeSpent: number = 0;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
