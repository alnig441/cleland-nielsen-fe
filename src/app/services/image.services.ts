import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ImageModel } from "../models/image.model";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from "./errorParser";

'./errorParser';

@Injectable()

export class ImageServices {

    errorParser = new ErrorParser();
    images: ImageModel[] = new Array();
    imagesUpdated: boolean = false;
    baseUrl = '/imagesDb';
    error: any;

    constructor(private http: HttpClient) {}

    getOne(): Promise<any> {
        return this.http.get(this.baseUrl, { observe: "response"})
            .toPromise()
    }

    getAll(): Promise<any> {
        return this.http.get(this.baseUrl, { observe: "response"})
            .toPromise()
            .then(res => {
                this.images = res.body as ImageModel[];
                this.imagesUpdated = true;
            })
            .catch(this.errorParser.handleError);
    }

    getLatest(): Promise<any> {
        return this.http.get(this.baseUrl +'/latest', {observe: "response"})
            .toPromise()
            .then(res => {
                this.images = res.body as ImageModel[];
                this.imagesUpdated = true;
            })
            .catch(this.errorParser.handleError)
    }

    getList(): Promise<any> {

        return this.http.get('/imagesDb', { observe: "response"})
            .toPromise()
            .then(res => {
                this.images = res.body as ImageModel[];
                this.imagesUpdated = true;
            })
            .catch(this.errorParser.handleError)
    }
}
