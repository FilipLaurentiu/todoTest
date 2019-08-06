import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';
import { ThrowStmt } from '@angular/compiler';

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

  @Output() togglePlayBtn: EventEmitter<boolean> = new EventEmitter<boolean>();

  stopedTimer: boolean;
  constructor() {
    this.stopedTimer = true;
  }

  public onTogglePlayBtn() {
    this.stopedTimer = !this.stopedTimer;
    this.togglePlayBtn.emit(this.stopedTimer);
  }

  toggleTodoComplete(todo: Todo) {
    this.toggleComplete.emit(todo);
  }

  removeTodo(todo: Todo) {
    this.remove.emit(todo);
  }

}
