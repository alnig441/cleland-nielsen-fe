import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({ selector: '[infobox]' })

export class InfoboxDirective {

    private hasView = true;

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef){}

    @Input() set infobox(condition: boolean){
        if(condition) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}