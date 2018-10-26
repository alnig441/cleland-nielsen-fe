import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'valueTransform'})

export class ValueTransform {

    transform(value?: string){

        if(value.split(' ')[0].toLowerCase() == 'us'){
            return value.slice(5);
        } else {
            return value;
        }

    }
}