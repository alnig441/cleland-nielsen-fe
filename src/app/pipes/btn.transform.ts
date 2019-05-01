import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'btnTransform'})

export class BtnTransform implements PipeTransform {

    transform(button?: any) {
        if(button){
          let name = button.name.toLowerCase();
          let language = button.language.toLowerCase();

          switch(name.toLowerCase()) {
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
            case 'who':
              button = language == 'english' ? name : 'hvem';
              return button;
            case 'what':
              button = language == 'english' ? name : 'hvad';
              return button;
            case 'where':
              button = language == 'english' ? name : 'hvor';
              return button;
            case 'why':
              button = language == 'english' ? name : 'hvorfor';
              return button;
            default:
              return button.name;
          }
        } else {
          return button;
        }
    }
}
