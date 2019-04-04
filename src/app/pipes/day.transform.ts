import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'dayTransform'})

export class DayTransform implements PipeTransform {

    transform(day: any) {

      if (day.language == 'english') {
        if (day.name == 1 || day.name == 21 || day.name == 31) {
          return day.name.toString() + 'st';
        }
        else if (day.name == 2 || day.name == 22) {
          return day.name.toString() + 'nd';
        }
        else if (day.name == 3 || day.name == 23) {
          return day.name.toString() + 'rd';
        }
        else {
          return day.name.toString() + 'th';
        }
      }
      if (day.language == 'danish') {
        return day.name.toString() + '.';
      }

    }
}
