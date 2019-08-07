import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent {

  @Input() todo: Todo;

  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Todo> = new EventEmitter();

  @Output()
  updateTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor() {
  }

  toggleTodoComplete(todo: Todo) {
    this.toggleComplete.emit(todo);
  }

  removeTodo(todo: Todo) {
    this.remove.emit(todo);
  }

  onUpdateTodo(todo: Todo) {
    this.updateTodo.emit(todo);
  }

  getTimeSpent(): string {
    const minutes = Math.floor(this.todo.timeSpent / 60);
    const seconds = (this.todo.timeSpent - (minutes * 60)).toString().padStart(2,'0');
    return `${minutes}:${seconds}`;
  }
}
