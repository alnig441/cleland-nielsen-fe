import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { ImageModel } from "../models/image.model";
import { Pipe, PipeTransform } from "@angular/core";
import 'rxjs/add/operator/toPromise';


@Injectable()

export class ImageServices {

    images: ImageModel[] = new Array();
    imagesUpdated: boolean = false;
    baseUrl = '/imagesDb';

    constructor(private http: HttpClient) {}

    getAll(): Observable<ImageModel[]> {
        return this.http.get<any>('/imagesDb')
            .do( result => {
                this.images = result;
            })
    }

    getLatest(): Promise<void> {
        console.log('get latest called');
        return this.http.get(this.baseUrl +'/latest', {observe: "response"})
            .toPromise()
            .then(res => {
                console.log('result: ', res);
                this.images = res.body as ImageModel[];
            })
            .catch(error => {
                console.log('am I calling error handler?', error);
                this.handleError;
            });
    }

    // getLatest(): Observable<ImageModel[]> {
    //     return this.http.get<ImageModel[]>('/imagesDb/latest')
    //         .do((result) => {
    //             console.log('result: ', result);
    //             this.images = result;
    //         });
    // }

    // getList(): Observable<HttpResponse<ImageModel[]>> {
    //     return this.http.get('/imagesDb', { observe: "response"})
    //         .subscribe(res => {
    //             console.log('response; ', res);
    //         })
    // }

    getList(): Promise<void> {
        return this.http.get('/imagesDb', { observe: "response"})
            .toPromise()
            .then(response => {
                console.log('show me response: ', response);
                this.images = response.body as ImageModel[];
            })
            .catch(error => {
                console.log('calling error handler: ', error, typeof error);
                this.handleError;
            });
    }

    private handleError(error: any) {
        console.log('an error occurred: ', error);
        return Promise.reject(error.message || error);
    }
}