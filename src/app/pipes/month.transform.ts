import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'monthTransform'})
export class MonthTransform implements PipeTransform {

    transform(month: any) {

        if(month || month == 0){

            let months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];

            return months[parseInt(month)];
        }
    }
}