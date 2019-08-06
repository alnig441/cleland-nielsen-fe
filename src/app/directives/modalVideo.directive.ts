import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

const $ = require('jquery');

@Directive({selector: '[modalVideo]'})

export class ModalVideoDirective {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ){}

    @Input() set modalVideo(condition: boolean) {


        if(condition){

            this.viewContainer.createEmbeddedView(this.templateRef);

            let height = window.innerHeight * .8;
            $('#video').attr('height', height);

            if(this.viewContainer.length > 1){
                this.viewContainer.remove(0);
            }

        } else {
            this.viewContainer.clear();
        }

    }
}
