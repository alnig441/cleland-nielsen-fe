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
    information: any;

    constructor( private http: HttpClient, private activeUser: HttpAuthService) {}

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            this.isNotPermitted()
        }

        else{
            return this.http.get(this.baseUrl, { observe: "response"})
                .toPromise()
                .then(res => {
                    this.images = res.body as ImageModel[];
                    this.imagesUpdated = true;

                    return Promise.resolve('success');
                })
                .catch(this.errorParser.handleError);
        }

    }

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            this.isNotPermitted()
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    getLatest(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            this.isNotPermitted()
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    getList(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            this.isNotPermitted()
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    addItem(): Promise<any> {
        if(!this.activeUser.isPermitted['to_add_images']){
            this.isNotPermitted()
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

    deleteItem(): Promise<any> {
        if(!this.activeUser.isPermitted['to_delete_images']){
            this.isNotPermitted()
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

    editItem(): Promise<any> {
        if(!this.activeUser.isPermitted['to_edit_images']){
            this.isNotPermitted()
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

    private clearRegisters(status?: any) {
        setTimeout(() => {
            this.information = null;
            this.error = null;
        },3000)
    }

    private isNotPermitted(): Promise<any> {
        return Promise.reject({ status: 405, message: 'insufficient permissions'})
            .catch(this.errorParser.handleError)
            .catch((error: any) => {
                this.error = error;
                this.clearRegisters();
            })
    }
}
