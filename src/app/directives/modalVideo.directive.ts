import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({selector: '[modalVideo]'})

export class ModalVideoDirective {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ){}

    @Input() set modalVideo(condition: boolean) {

        if(condition){
            this.viewContainer.createEmbeddedView(this.templateRef);

            if(this.viewContainer.length > 1){
                this.viewContainer.remove(0);
            }

        } else {
            this.viewContainer.clear();
        }

    }
}
