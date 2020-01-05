import { Directive, Input, TemplateRef, ElementRef, ViewContainerRef } from "@angular/core";

const $ = require('jquery');

@Directive({selector: '[appVideoModal]'})

export class AppVideoModalDirective {
  constructor(
      private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef,
  ){}

  @Input() set appVideoModal(condition: any) {

    if(condition){

      let height = window.innerHeight * .8;

      this.viewContainer.createEmbeddedView(this.templateRef);

      $('.app-modal').attr('height', height);

      if(this.viewContainer.length > 1){
          this.viewContainer.remove(0);
      }

    } else {
        this.viewContainer.clear();
    }

  }

}
