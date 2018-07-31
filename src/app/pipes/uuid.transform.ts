import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'uuidTransform'})
export class UuidTransformPipe implements PipeTransform {

    transform(uuid: any, items: any): string {

        if(items.length > 0 ) {

            let id: string,
                name: string,
                props: string[] = Object.keys(items[0]),
                transformed: string;

            let item;

            props.forEach((property : string) => {
                if(property.match(/_name/)){
                    name = property;
                }
                if(property.match(/_id/)){
                    id = property;
                }})

            items.forEach((elem : any) => {
                if(elem[id] == uuid){
                    transformed = elem[name];
                }
            })

            return transformed;
        }

    }
}