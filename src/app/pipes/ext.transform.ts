import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'extTransform'})

export class ExtTransform implements PipeTransform {

    transform(file?: string) {

        if(file){
            var temp = file.split('.');
            temp.pop();
            temp.push('png');

            console.log('returning ', temp.join('.'));

            return temp.join('.');
        }
    }
}