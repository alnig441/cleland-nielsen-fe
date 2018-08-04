import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ImageModel } from "../models/image.model";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from "./errorParser";
import { HttpAuthService } from "./httpAuth.service";
import { Router } from "@angular/router";

@Injectable()

export class ImageServices {

    errorParser = new ErrorParser();
    images: ImageModel[] = new Array();
    imagesUpdated: boolean = false;
    baseUrl = '/imagesDb';
    message: any = {};

    constructor(private router: Router, private http: HttpClient, private activeUser: HttpAuthService) {}

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});        }
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
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    getLatest(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    getList(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_images']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    addItem(): Promise<any> {
        if(!this.activeUser.isPermitted['to_add_images']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

    deleteItem(): Promise<any> {
        if(!this.activeUser.isPermitted['to_delete_images']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

    editItem(): Promise<any> {
        if(!this.activeUser.isPermitted['to_edit_images']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }
    }

    private setMessage(message ?: any) {
        message.status != 200 ? this.message.failure = message : this.message.success = message;

        setTimeout(() => {
            this.message.success = null;
            this.message.failure = null;
            if(message.forceLogout){
                this.activeUser.logout();
                this.router.navigate(['/login']);
            }
        },3000)
    }
}
