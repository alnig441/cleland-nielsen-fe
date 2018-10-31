import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({ selector: '[infobox]' })

export class InfoboxDirective {

    private test = 'hello';

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef){}

    @Input() set infobox(condition: boolean){

        console.log('condition ', condition);

        if(condition) {
            // var index = Object.keys(condition);

            condition['keys'] = new Array();

            console.log('condition: ', condition);

            Object.keys(condition).forEach(key => {
                var key_value = new Array()
                if(key == 'names' || key == 'city' || key == 'event_da' || key == 'event_en'){
                    if(key == 'city') {
                        if(condition['country'] == 'United States') {
                            key_value = [key, [condition[key], condition['state'], condition['country']]];
                        } else {
                            key_value = [key, [condition[key], condition['country']]];
                        }
                    } else {
                        key_value = [key, condition[key]];
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