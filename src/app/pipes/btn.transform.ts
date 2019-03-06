import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'btnTransform'})

export class BtnTransform implements PipeTransform {

    transform(button?: any) {
        if(button){
          switch(button.name.toLowerCase()) {
            case 'fwd':
              button = button.language.toLowerCase() == 'english' ? 'next' : 'frem';
              return button;
            case 'rwd':
              button = button.language.toLowerCase() == 'english' ? 'previous' : 'tilbage';
              return button;
            default:
              return button;
          }
        } else {
          return button;
        }
    }
}
