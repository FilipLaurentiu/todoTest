import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { interval } from 'rxjs';

import { Todo } from 'src/app/todo';

@Component({
  selector: 'app-todo-timer',
  templateUrl: './todo-timer.component.html',
  styleUrls: ['./todo-timer.component.scss']
})
export class TodoTimerComponent implements OnInit {
  private readonly π = Math.PI;
  private α = 0;
  public timerRun: boolean = false;
  @Input() public todo: Todo;
  @Output() public updateTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @ViewChild('loader') private loader: ElementRef;
  @ViewChild('border') private border: ElementRef;

  ngOnInit() {
    this.α = this.setPieTimerPosition();
  }

  private setPieTimerPosition(): number {
    if (this.todo.timeSpent) {
      return 360 - (360 / (1800 / this.todo.timeSpent));
    } else {
      return 0;
    }
  }

  private draw(): void {
    this.α++;
    this.α = this.setPieTimerPosition();
    const r = (this.α * this.π / 180);
    const x = Math.sin(r) * 12.5;
    const y = Math.cos(r) * - 12.5;
    const mid = (this.α > 180) ? 1 : 0;
    const anim = `M 0 0 v -12.5 A 12.5 12.5 1 ${mid} 1 ${x} ${y} z`;
    this.loader.nativeElement.setAttribute('d', anim);
    this.border.nativeElement.setAttribute('d', anim);
    setTimeout(() => {
      if (this.timerRun) {
        if (this.todo.timeSpent > 0) {
          this.draw();
        } else {
          this.α = 360;
          this.timerRun = false;
        }
      }
    }, 1000); // Redraw
  };

  public onToggleStartBtn(): void {
    this.timerRun = !this.timerRun;
    if (this.timerRun && !this.todo.complete) {
      this.draw();
      this.initCounter();
    }
  }

  private initCounter(): void {
    const intervalSubscription = interval(1000).subscribe(() => {
      if (this.timerRun && !this.todo.complete && this.todo.timeSpent > 0) {
        this.todo.timeSpent--;
      }
      if (this.todo.timeSpent === 0) {
        this.todo.complete = true;
        intervalSubscription.unsubscribe();
      }
      this.updateTodo.emit(this.todo);
    });
  }
}
