import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-todo-timer',
  templateUrl: './todo-timer.component.html',
  styleUrls: ['./todo-timer.component.scss']
})
export class TodoTimerComponent implements OnInit {
  private α = 0
  private π = Math.PI
  @Input() public timer = 30;
  @ViewChild('loader') private loader: ElementRef;
  @ViewChild('border') private border: ElementRef;

  ngOnInit() {
    this.draw();
  }

  private draw() {
    this.α++;
    this.α %= 360;
    var r = (this.α * this.π / 180)
      , x = Math.sin(r) * 12.5
      , y = Math.cos(r) * - 12.5
      , mid = (this.α > 180) ? 1 : 0
      , anim = 'M 0 0 v -12.5 A 12.5 12.5 1 '
        + mid + ' 1 '
        + x + ' '
        + y + ' z';

    this.loader.nativeElement.setAttribute('d', anim);
    this.border.nativeElement.setAttribute('d', anim);
    setTimeout(() => this.draw(), this.timer); // Redraw
  };
}
