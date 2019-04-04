import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'menuTransform'})

export class MenuTransform implements PipeTransform {

    transform(button?: any) {
        if(button){
          switch(button.name.toLowerCase()) {
            case 'images':
              button = button.language.toLowerCase() == 'english' ? 'images' : 'billeder';
              return button;
            case 'videos':
              button = button.language.toLowerCase() == 'english' ? 'videos' : 'film';
              return button;
            case 'users':
              button = button.language.toLowerCase() == 'english' ? 'users' : 'brugere';
              return button;
            case 'accounts':
              button = button.language.toLowerCase() == 'english' ? 'accounts' : 'konti';
              return button;
            case 'permissions':
              button = button.language.toLowerCase() == 'english' ? 'permissions' : 'rettigheder';
              return button;
            default:
              return button.name;
          }
        } else {
          return button;
        }
    }
}
