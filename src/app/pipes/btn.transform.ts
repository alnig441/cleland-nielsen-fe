import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'btnTransform'})

export class BtnTransform implements PipeTransform {

    transform(button?: any) {
        if(button){
          let name = button.name.toLowerCase();
          let language = button.language.toLowerCase();

          switch(name) {
            case 'fwd':
              button = language == 'english' ? 'next' : 'frem';
              return button;
            case 'rwd':
              button = language == 'english' ? 'previous' : 'tilbage';
              return button;
            case 'close':
              button = language == 'english' ? name : 'luk';
              return button;
            case 'print':
              button = language == 'english' ? name : 'udskriv';
              return button;
            case 'cancel':
              button = language == 'english' ? name : 'afslut';
              return button;
            case 'submit':
              button = language == 'english' ? name : 'udfør';
              return button;
            case 'update':
              button = language == 'english' ? name : 'opdater';
              return button;
            case 'delete':
              button = language == 'english' ? name : 'slet';
              return button;
            default:
              return button.name;
          }
        } else {
          return button;
        }
    }
}
