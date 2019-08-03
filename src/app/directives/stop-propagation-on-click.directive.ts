import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[stop-propagation-on-click]'})

export class StopPropagationOnClick {

  @HostListener('click', ['$event']) onClick(event: any) {
    event.stopPropagation();
  }

}
