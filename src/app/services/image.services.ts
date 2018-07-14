import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";

@Injectable()

export class ImageServices {

    getAll(): Observable<boolean> {
        return of(true).delay(1000).do(val => {
            console.log('image services getAll() ', val)
        })
    }

}