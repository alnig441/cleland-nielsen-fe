import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({selector: '[modalImage]'})

export class ModalImageDirective {

    constructor(private  templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef){}

    @Input() set modalImage(condition: boolean) {

        console.log('condition: ', condition)

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