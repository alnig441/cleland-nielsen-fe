import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({ selector: '[infobox]' })

export class InfoboxDirective {

    private test = 'hello';

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef){}

    @Input() set infobox(condition: boolean){

        if(condition) {

            condition['keys'] = new Array();

            Object.keys(condition).forEach(key => {
                var key_value = new Array()
                if ((key == 'names' || key == 'city' || key == 'event_da' || key == 'event_en') && condition[key]){
                    if (key == 'city') {
                        key_value = condition['country'] == 'United States' ?  [key, [condition[key], condition['state'], condition['country']]] : [key, [condition[key], condition['country']]] ;
                    } else {
                        key_value = Array.isArray(condition[key]) ? [key, condition[key]] : [key, [condition[key]]];
                    }

                    condition['keys'].push(key_value);
                }
            })
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}