export class Todo {
  id: number;
  title = '';
  complete = false;
  remainingTime: number = 1800;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
