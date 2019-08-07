import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { Observable, interval } from 'rxjs';

import { Todo } from 'src/app/todo';

@Component({
  selector: 'app-todo-timer',
  templateUrl: './todo-timer.component.html',
  styleUrls: ['./todo-timer.component.scss']
})
export class TodoTimerComponent implements OnInit {
  private α = 0;
  private readonly π = Math.PI;
  private readonly drawInterval = 82;
  public timerRun: boolean = false;
  public counter: Observable<number>;
  @Input() public todo: Todo;
  @Input() public maxTimerValue: number = 30;
  @Output() public updateTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @ViewChild('loader') private loader: ElementRef;
  @ViewChild('border') private border: ElementRef;

  constructor() {
  }

  ngOnInit() {
    if(this.todo.timeSpent){
      this.α = this.drawInterval * this.todo.timeSpent;
    }
    this.initCounter();
  }

  private initCounter(): void {
    const internalSubscription = interval(1000).subscribe(() => {
      if (this.timerRun && !this.todo.complete && this.todo.timeSpent < this.maxTimerValue) {
        this.todo.timeSpent++;
      }
      if (this.todo.timeSpent === this.maxTimerValue) {
        this.todo.complete = true;
        internalSubscription.unsubscribe();
      }
    })
  }

  private draw(): void {
    this.α++;
    this.α %= 360;
    const r = (this.α * this.π / 180);
    const x = Math.sin(r) * 12.5;
    const y = Math.cos(r) * - 12.5;
    const mid = (this.α > 180) ? 1 : 0;
    const anim = `M 0 0 v -12.5 A 12.5 12.5 1 ${mid} 1 ${x} ${y} z`;

    this.loader.nativeElement.setAttribute('d', anim);
    this.border.nativeElement.setAttribute('d', anim);
    setTimeout(() => {
      if (this.timerRun) {
        if (this.todo.timeSpent < this.maxTimerValue) {
          this.draw();
        } else {
          this.timerRun = false;
        }
      }
    }, this.drawInterval); // Redraw
  };


  onToggleStartBtn(): void {
    this.timerRun = !this.timerRun;
    if (this.timerRun) {
      this.draw();
    }
    this.updateTodo.emit(this.todo);
  }

}
