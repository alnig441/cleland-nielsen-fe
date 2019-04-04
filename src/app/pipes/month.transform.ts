import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'monthTransform'})
export class MonthTransform implements PipeTransform {

    transform(month: any) {

        if(month.name || month.name == 0){

            let months = [
                { english: 'January', danish: 'januar' },
                { english: 'February', danish: 'februar' },
                { english: 'March', danish: 'marts' },
                { english: 'April', danish: 'april' },
                { english: 'May', danish: 'maj' },
                { english: 'June', danish: 'juni' },
                { english: 'July', danish: 'juli' },
                { english: 'August', danish: 'august' },
                { english: 'September', danish: 'september' },
                { english: 'October', danish: 'oktober' },
                { english: 'November', danish: 'november' },
                { english: 'December', danish: 'december' }
            ];

            return months[parseInt(month.name)][month.language];
        }
    }
}
