import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({ selector: '[infobox]' })

export class InfoboxDirective {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ){}

    @Input() set infobox(condition: boolean){

        if(condition) {

            condition['who'] = condition['meta']['names'].length > 0 ?
              condition['meta']['names'].toString().replace(/,/g, ', '):
              null;

            condition['meta']['venue'] ?
              condition['location']['country'] == 'United States' ?
                condition['where'] =`${condition['meta']['venue']}, ${condition['location']['city']}, ${condition['location']['state']}`:
                condition['where'] =`${condition['meta']['venue']}, ${condition['location']['city']}, ${condition['location']['country']}`:
              condition['location']['country'] == 'United States' ?
                condition['where'] = `${condition['location']['city']}, ${condition['location']['state']}`:
                condition['where'] = `${condition['location']['city']}, ${condition['location']['country']}`;

            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
