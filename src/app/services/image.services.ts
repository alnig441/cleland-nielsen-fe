import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ImageModel } from "../models/image.model";

@Injectable()

export class ImageServices {

    images: ImageModel[] = new Array();
    imagesUpdated: boolean = false;

    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        return this.http.get<any>('/imagesDb')
            .do( result => {
                this.images = result;
            })
    }

    getLatest(): Observable<any> {
        return this.http.get<any>('/imagesDb/latest')
            .do((result) => {
                console.log('result: ', result);
                this.images = result;
            });

    }
}