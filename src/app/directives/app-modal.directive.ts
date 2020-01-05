import { Directive, Input, TemplateRef, ElementRef, ViewContainerRef } from "@angular/core";

const $ = require('jquery');

@Directive({selector: '[appModal]'})

export class AppModalDirective {
  constructor(
      private templateRef: TemplateRef<any>,
      private viewContainer: ViewContainerRef,
  ){}

  @Input() set appModal(condition: any) {

    if(condition){

      console.log('condition: ', condition, '\ntempplateREf: ', this);

      let height = window.innerHeight * .8;

      this.viewContainer.createEmbeddedView(this.templateRef);

      $('.app-modal').attr('height', height);
      $('.assetviewer-modal').modal('show');

      if(this.viewContainer.length > 1){
          this.viewContainer.remove(0);
      }

    } else {
        this.viewContainer.clear();
    }

  }

}
