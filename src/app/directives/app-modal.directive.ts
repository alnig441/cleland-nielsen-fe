import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

const $ = require('jquery');

@Directive({selector: '[appModal]'})

export class AppModalDirective {
  constructor(
      private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef
  ){}

  @Input() set appModal(condition: string) {
    
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