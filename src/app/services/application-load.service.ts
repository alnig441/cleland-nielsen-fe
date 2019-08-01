import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";

// import { APP_SETTINGS } from "../settings"

@Injectable()
export class AppLoadService {

    constructor(
      private http: HttpClient
    ) {}

    initializeApp(): Promise<any> {

        return new Promise((resolve, reject) => {
            console.log(`intitializeApp:: inside promise`);

            setTimeout(() => {
                console.log(`intitializeApp:: inside timeout`);

                resolve();
            }, 3000)
        })
    }

    getSettings(): Promise<any> {

        console.log(`getSettings:: before http.get call`)

        return this.http.get('some/api')
            .toPromise()
            .then((settings) => {
                console.log(`settings from api: ${settings}`)

                // APP_SETTINGS.connectionString = settings[0].value;
                // APP_SETTINGS.defaultImageUrl = settings[1].value;

                // console.log(`APP_SETTONGS: ${APP_SETTINGS}`);
                return settings
            })

    }
}
