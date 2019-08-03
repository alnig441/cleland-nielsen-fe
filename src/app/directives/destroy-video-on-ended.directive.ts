import { Directive, HostListener } from '@angular/core';
const $ = require('jquery');

@Directive({ selector: '[destroy-video-on-ended]'})

export class DestroyVideoOnEnded {

  @HostListener('ended', ['$event']) onEnded(event: any) {
    $('.video-modal').modal('hide');
  }

}
