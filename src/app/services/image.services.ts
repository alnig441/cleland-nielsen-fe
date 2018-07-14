import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()

export class ImageServices {

    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        // return of(true).delay(1000).do(val => {
        //     console.log('image services getAll() ', val)
        // })

        return this.http.get<any>('/images')
            .map(image => {
                console.log('returned from image route: ', image);
            })

    }

}