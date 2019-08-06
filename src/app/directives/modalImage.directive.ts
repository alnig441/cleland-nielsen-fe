import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

const $ = require('jquery');

@Directive({selector: '[modalImage]'})

export class ModalImageDirective {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ){}

    @Input() set modalImage(condition: boolean) {

        if(condition){

          let height = window.innerHeight * .8;

          this.viewContainer.createEmbeddedView(this.templateRef);

          $('.modal-image').attr('height', height);

          if(this.viewContainer.length > 1){
              this.viewContainer.remove(0);
          }

        } else {
            this.viewContainer.clear();
        }

    }
}
