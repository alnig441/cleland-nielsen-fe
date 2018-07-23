import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { ImageModel } from "../models/image.model";
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs";


@Injectable()

export class ImageServices {

    images: ImageModel[] = new Array();
    imagesUpdated: boolean = false;
    baseUrl = '/imagesDb';
    error: any;

    constructor(private http: HttpClient) {}

    getAll(): Promise<any> {
        return this.http.get(this.baseUrl, { observe: "response"})
            .toPromise()
            .then(res => {
                this.images = res.body as ImageModel[];
                this.imagesUpdated = true;
            })
            .catch(this.handleError);
    }

    getLatest(): Promise<any> {
        return this.http.get(this.baseUrl +'/latest', {observe: "response"})
            .toPromise()
            .then(res => {
                this.images = res.body as ImageModel[];
                this.imagesUpdated = true;
            })
            .catch(this.handleError)
    }

    getList(): Promise<any> {

        return this.http.get('/imagesDb', { observe: "response"})
            .toPromise()
            .then(res => {
                this.images = res.body as ImageModel[];
                this.imagesUpdated = true;
            })
            .catch(this.handleError)
    }


    private handleError(error: any): Promise<any> {

        let err = {};

        if(error.status === 401){
            err = {
                status: error.status,
                message: 'unauthorized/token expired - please login again',
            };
        }
        // add handlers
        throw err || error;
    }

}
