import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { interval, Subscription } from 'rxjs';

import { Todo } from 'src/app/todo';

@Component({
  selector: 'app-todo-timer',
  templateUrl: './todo-timer.component.html',
  styleUrls: ['./todo-timer.component.scss']
})
export class TodoTimerComponent implements OnInit, OnDestroy {
  private readonly π = Math.PI;
  private α = 0;
  private intervalSubscription: Subscription;
  public timerRun: boolean = false;
  @Input() public todo: Todo;
  @Output() public updateTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @ViewChild('loader') private loader: ElementRef;
  @ViewChild('border') private border: ElementRef;

  public ngOnInit() {
    if (!this.todo.complete) {
      this.draw();
    }
  }

  public onToggleStartBtn(): void {
    this.timerRun = !this.timerRun;
    if (this.timerRun) {
      if (!this.todo.complete) {
        this.draw();
        this.initCounter();
      }
    } else {
      this.intervalSubscription.unsubscribe();
    }
  }

  private draw(): void {
    this.α = this.setPieTimerPosition();
    const r = (this.α * this.π / 180);
    const x = Math.sin(r) * 12.5;
    const y = Math.cos(r) * - 12.5;
    const mid = (this.α > 180) ? 1 : 0;
    const anim = `M 0 0 v -12.5 A 12.5 12.5 1 ${mid} 1 ${x} ${y} z`;
    this.loader.nativeElement.setAttribute('d', anim);
    this.border.nativeElement.setAttribute('d', anim);
    const timer = setTimeout(() => {
      if (this.timerRun) {
        if (this.todo.remainingTime > 0) {
          this.draw();
        } else {
          this.α = 360;
          this.timerRun = false;
        }
      } else {
        clearTimeout(timer);
      }
    }, 1000); // Redraw
  };

  private setPieTimerPosition(): number {
    if (this.todo.remainingTime) {
      return 360 - (360 / (1800 / this.todo.remainingTime));
    } else {
      return 0;
    }
  }

  private initCounter(): void {
    this.intervalSubscription = interval(1000).subscribe(() => {
      if (this.timerRun && !this.todo.complete && this.todo.remainingTime > 0) {
        this.todo.remainingTime--;
      } else {
        this.intervalSubscription.unsubscribe();
      }
      this.updateTodo.emit(this.todo);
    });
  }

  public ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}
