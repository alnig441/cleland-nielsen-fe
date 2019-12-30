import { Component, DoCheck, OnInit, ViewEncapsulation, HostListener } from "@angular/core";
import { state, style, animate, transition, trigger, AnimationEvent } from "@angular/animations";

@Component({
  selector: 'app-search-field',
  template: require('./search-field.component.pug'),
  styleUrls: ['./search-field.component.scss'],
  animations: [
    trigger('search', [
      state('*', style({
        width: '25px',
        background: 'transparent'
      })),
      state('in', style({
        width: '200px',
        position: 'absolute',
        transform: 'translate(50px,50px)',
        background: 'white',
        color: 'black',
        zIndex: 10000000,
      })),
      transition('* => in', [
        animate('200ms')
      ]),
      transition('in => *', [
        animate('100ms')
      ])
    ])
  ]
})

export class SearchFieldComponent implements OnInit {
  state: string;
  test: any;

  constructor() {}

  @HostListener('click', ['$event']) onClickHandler(event: MouseEvent) {
    this.state = 'in';
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key == 'Enter' || event.key == 'Escape') {
      this.state = null;
    }
  }

  ngOnInit(): void {
  }

  onBegin(event: AnimationEvent) {
  }

  onDone(event: AnimationEvent) {
  }

}
