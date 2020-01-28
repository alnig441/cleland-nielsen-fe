import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthenticationServices } from "../services/authentication.services";

@Directive({ selector: '[infobox]' })

export class InfoboxDirective {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private activeUser: AuthenticationServices
    ){}

    @Input() set infobox(condition: boolean){

        if(condition) {
          condition['what'] = condition['meta']['event'] ?
            this.activeUser.language == 'english' ?
              condition['meta']['event']['en'] :
              condition['meta']['event']['da'] :
            null ;

          condition['who'] = condition['meta']['names'].length > 0 ?
            condition['meta']['names'].toString().replace(/,/g, ', '):
            null ;

          condition['where'] = condition['meta']['venue'] ?
            condition['location']['country'] == 'United States' ?
              `${condition['meta']['venue']}, ${condition['location']['city']}, ${condition['location']['state']}`:
              `${condition['meta']['venue']}, ${condition['location']['city']}, ${condition['location']['country']}`:
            condition['location']['country'] == 'United States' ?
              `${condition['location']['city']}, ${condition['location']['state']}`:
              `${condition['location']['city']}, ${condition['location']['country']}`;

          condition['why'] = condition['meta']['occasion'] ?
            condition['meta']['occasion'] :
            null ;

          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
