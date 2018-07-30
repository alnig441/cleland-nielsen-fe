import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ImageModel } from "../models/image.model";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from "./errorParser";
import { HttpAuthService } from "./httpAuth.service";

@Injectable()

export class ImageServices {

    errorParser = new ErrorParser();
    images: ImageModel[] = new Array();
    imagesUpdated: boolean = false;
    baseUrl = '/imagesDb';
    error: any;

    constructor( private http: HttpClient, private activeUser: HttpAuthService) {}

    getOne(): Promise<any> {

        if(!this.activeUser.isPermitted['to_view_images']){
            return Promise.reject({ status: 405, message: 'insufficient monkey permissions'})
                .catch(this.errorParser.handleError)
        }

        else {
            return this.http.get(this.baseUrl, { observe: "response"})
                .toPromise()
        }

    }

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError)
                .then((x) => {
                    console.log('what: ', x);
                })
        }

        else{
            return this.http.get(this.baseUrl, { observe: "response"})
                .toPromise()
                .then(res => {
                    this.images = res.body as ImageModel[];
                    this.imagesUpdated = true;
                })
                .catch(this.errorParser.handleError);
        }

    }

    getLatest(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else {
            return this.http.get(this.baseUrl +'/latest', {observe: "response"})
                .toPromise()
                .then(res => {
                    this.images = res.body as ImageModel[];
                    this.imagesUpdated = true;
                })
                .catch(this.errorParser.handleError)
        }

    }

    getList(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            return Promise.reject({ status: 405, message: 'insufficient permissions'})
                .catch(this.errorParser.handleError);
        }

        else{
            return this.http.get('/imagesDb', { observe: "response"})
                .toPromise()
                .then(res => {
                    this.images = res.body as ImageModel[];
                    this.imagesUpdated = true;
                })
                .catch(this.errorParser.handleError)
        }

    }
}
