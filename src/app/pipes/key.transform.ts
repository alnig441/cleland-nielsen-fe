import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'keyTransform'
})

export class KeyTransform implements PipeTransform {

    transform(key: string){
        const keys = {
            names: 'who',
            event_da: 'what',
            event_en: 'what',
            city: 'where',
            data: 'when',
        }
        return keys[key] ? keys[key]: null;
    }
}