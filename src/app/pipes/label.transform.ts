import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'labelTransform'})

export class LabelTransform implements PipeTransform {

    transform(label?: any) {
        if(label){
          let name = label.name.toLowerCase();
          let language = label.language.toLowerCase();

          switch(name.toLowerCase()) {
            case 'fwd':
              label = language == 'english' ? 'next' : 'frem';
              return label;
            case 'rwd':
              label = language == 'english' ? 'previous' : 'tilbage';
              return label;
            case 'close':
              label = language == 'english' ? name : 'luk';
              return label;
            case 'print':
              label = language == 'english' ? name : 'udskriv';
              return label;
            case 'cancel':
              label = language == 'english' ? name : 'afslut';
              return label;
            case 'submit':
              label = language == 'english' ? name : 'udfør';
              return label;
            case 'update':
              label = language == 'english' ? name : 'opdater';
              return label;
            case 'delete':
              label = language == 'english' ? name : 'slet';
              return label;
            case 'who':
              label = language == 'english' ? name : 'hvem';
              return label;
            case 'what':
              label = language == 'english' ? name : 'hvad';
              return label;
            case 'where':
              label = language == 'english' ? name : 'hvor';
              return label;
            case 'why':
              label = language == 'english' ? name : 'hvorfor';
              return label;
            default:
              return label.name;
          }
        } else {
          return label;
        }
    }
}
